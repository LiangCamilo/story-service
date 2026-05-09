import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFavoriteStoryDto } from 'src/story/application/dtos/favorite-story-dtos/create-favorite-story.dto';
import { FavoriteStoryRepositoryPort } from 'src/story/application/ports/favorite-story.repository';
import { FavoriteStory } from 'src/story/domain/entities/favorite-story.entity';
import { FavoriteStoryWithDetails } from 'src/story/application/read-models/favorite-story-with-details.read-model';
import { StoryWithDetails } from 'src/story/application/read-models/story-with-details.read-model';
import { FilterFavoriteStoriesDto } from 'src/story/application/dtos/favorite-story-dtos/filter-favorite-stories.dto';

@Injectable()
export class PrismaStoryFavoriteRepository {}

@Injectable()
export class PrismaFavoriteStoryRepository implements FavoriteStoryRepositoryPort {
  constructor(private prisma: PrismaService) {}

  async findExistingFavorite(
    userId: string,
    storyId: string,
  ): Promise<boolean> {
    const existingFavorite = await this.prisma.favoriteStory.findUnique({
      where: {
        storyId_userId: {
          storyId: storyId,
          userId: userId,
        },
      },
    });

    if (existingFavorite) {
      return true;
    }

    return false;
  }

  async create(
    createFavoriteStoryDto: CreateFavoriteStoryDto,
  ): Promise<FavoriteStory | undefined> {
    const data = FavoriteStory.create({
      storyId: createFavoriteStoryDto.storyId,
      userId: createFavoriteStoryDto.userId,
    }).toPrimitives();

    const addedStoryToFavorite = await this.prisma.favoriteStory.create({
      data: {
        id: data.id,
        userId: data.userId,
        story: {
          connect: {
            id: data.storyId,
          },
        },
      },
    });

    return FavoriteStory.create({
      id: addedStoryToFavorite.id,
      storyId: data.storyId,
      userId: addedStoryToFavorite.userId,
      createdAt: addedStoryToFavorite.createdAt,
      updatedAt: addedStoryToFavorite.updatedAt,
    });
  }

  async filterFavoriteStories(
    filterFavoriteStoriesDto: FilterFavoriteStoriesDto,
  ): Promise<StoryWithDetails[]> {
    const {
      offset,
      limit,
      userId,
      genreName,
      secondaryGenreName,
      status,
      title,
      totalChapters,
      totalRating,
      totalViews,
    } = filterFavoriteStoriesDto;

    const favoriteStories: Array<StoryWithDetails> = [];
    const orderBy = totalRating
      ? { story: { totalRating: 'desc' as const } }
      : totalViews
        ? { story: { totalViews: 'desc' as const } }
        : totalChapters
          ? { story: { totalChapters: 'desc' as const } }
          : { createdAt: 'desc' as const };

    const rawFavoriteStories = await this.prisma.favoriteStory.findMany({
      where: {
        userId: userId,
        story: {
          hidden: false,
          ...(title && {
            title: {
              contains: title,
              mode: 'insensitive',
            },
          }),

          ...(genreName && {
            genre: {
              name: {
                equals: genreName,
                mode: 'insensitive',
              },
            },
          }),

          ...(secondaryGenreName && {
            secondaryGenre: {
              name: {
                equals: secondaryGenreName,
                mode: 'insensitive',
              },
            },
          }),

          ...(status && {
            status,
          }),
        },
      },
      include: {
        story: {
          include: {
            genre: true,
            secondaryGenre: true,
            tags: true,
          },
        },
      },

      skip: offset,
      take: limit,
      orderBy,
    });

    rawFavoriteStories.map((favoriteStory) => {
      favoriteStories.push(this.mapToStoryWithDetails(favoriteStory.story));
    });

    return favoriteStories;
  }

  private mapToFavoriteStoryWithDetails(favoriteStory: {
    id: string;
    storyId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    story: any;
  }): FavoriteStoryWithDetails {
    return {
      id: favoriteStory.id,
      storyId: favoriteStory.storyId,
      userId: favoriteStory.userId,
      createdAt: favoriteStory.createdAt,
      updatedAt: favoriteStory.updatedAt,
      story: this.mapToStoryWithDetails(favoriteStory.story),
    };
  }

  private mapToStoryWithDetails(story: any): StoryWithDetails {
    return {
      id: story.id,
      title: story.title,
      description: story.description,
      coverUrl: story.coverUrl,
      hidden: story.hidden,
      userId: story.userId,
      genre: { id: story.genre.id, name: story.genre.name },
      ...(story.secondaryGenre && {
        secondaryGenre: {
          id: story.secondaryGenre.id,
          name: story.secondaryGenre.name,
        },
      }),
      tags: story.tags.map((tag: any) => ({ id: tag.id, name: tag.name })),
      totalRating: Number(story.totalRating),
      ratingSum: Number(story.ratingSum),
      ratingCount: story.ratingCount,
      totalChapters: story.totalChapters,
      totalViews: story.totalViews,
      totalFavorites: story.totalFavorite,
      status: story.status,
      createdAt: story.createdAt,
      updatedAt: story.updatedAt,
    };
  }
}
