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
      include: {
        story: true,
      },
    });

    return FavoriteStory.create({
      id: addedStoryToFavorite.id,
      storyId: data.storyId,
      userId: addedStoryToFavorite.userId,
      createdAt: addedStoryToFavorite.createdAt,
      updatedAt: addedStoryToFavorite.updatedAt ?? undefined,
      story: {
        id: addedStoryToFavorite.story.id,
        userId: addedStoryToFavorite.story.userId,
        description: addedStoryToFavorite.story.description,
        genreId: addedStoryToFavorite.story.genreId,
        title: addedStoryToFavorite.story.title,
      },
    });
  }

  async filterFavoriteStories(
    userId: string,
    filterFavoriteStoriesDto: FilterFavoriteStoriesDto,
  ): Promise<{ stories: StoryWithDetails[]; totalItems: number }> {
    const {
      offset,
      limit,
      genreName,
      secondaryGenreName,
      status,
      title,
      totalChapters,
      totalRating,
      totalViews,
      tagNames,
    } = filterFavoriteStoriesDto;

    const favoriteStories: Array<StoryWithDetails> = [];
    const orderBy = totalRating
      ? { story: { totalRating: 'desc' as const } }
      : totalViews
        ? { story: { totalViews: 'desc' as const } }
        : totalChapters
          ? { story: { totalChapters: 'desc' as const } }
          : { createdAt: 'desc' as const };

    const where = {
      userId: userId,
      story: {
        hidden: false,
        ...(title && {
          title: {
            contains: title,
            mode: 'insensitive' as const,
          },
        }),

        ...(genreName && {
          genre: {
            name: {
              equals: genreName,
              mode: 'insensitive' as const,
            },
          },
        }),

        ...(secondaryGenreName && {
          secondaryGenre: {
            name: {
              equals: secondaryGenreName,
              mode: 'insensitive' as const,
            },
          },
        }),

        ...(status && {
          status,
        }),

        ...(tagNames &&
          tagNames.length > 0 && {
            tags: {
              some: {
                name: {
                  in: tagNames,
                  mode: 'insensitive' as const,
                },
              },
            },
          }),
      },
    };

    const [rawFavoriteStories, totalItems] = await this.prisma.$transaction([
      this.prisma.favoriteStory.findMany({
        where,
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
      }),
      this.prisma.favoriteStory.count({ where }),
    ]);

    rawFavoriteStories.map((favoriteStory) => {
      favoriteStories.push(this.mapToStoryWithDetails(favoriteStory.story));
    });

    return { stories: favoriteStories, totalItems };
  }

  async removeStoryFromFavorite(
    userId: string,
    storyId: string,
  ): Promise<FavoriteStory> {
    const { id, createdAt, updatedAt, story } =
      await this.prisma.favoriteStory.delete({
        where: {
          storyId_userId: {
            userId,
            storyId,
          },
        },
        include: {
          story: true,
        },
      });

    return FavoriteStory.create({
      id,
      userId,
      storyId,
      createdAt,
      updatedAt: updatedAt ?? undefined,
      story: {
        id: story.id,
        userId: story.userId,
        description: story.description,
        genreId: story.genreId,
        title: story.title,
      },
    });
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
      totalComments: story.totalComments,
      status: story.status,
      createdAt: story.createdAt,
      updatedAt: story.updatedAt,
      lastActivityAt: story.lastActivityAt,
    };
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
}
