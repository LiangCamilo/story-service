import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFavoriteStoryDto } from 'src/story/application/dtos/favorite-story-dtos/create-favorite-story.dto';
import { FavoriteStoryRepositoryPort } from 'src/story/application/ports/favorite-story.repository';
import { FavoriteStory } from 'src/story/domain/entities/favorite-story.entity';
import { FavoriteStoryWithDetails } from 'src/story/application/read-models/favorite-story-with-details.read-model';
import { StoryWithDetails } from 'src/story/application/read-models/story-with-details.read-model';

@Injectable()
export class PrismaStoryFavoriteRepository {}

@Injectable()
export class PrismaFavoriteStoryRepository implements FavoriteStoryRepositoryPort {
  constructor(private prisma: PrismaService) {}

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

  async findFavoriteStoriesByUserId(
    userId: string,
  ): Promise<FavoriteStoryWithDetails[] | undefined> {
    const favoriteStories = await this.prisma.favoriteStory.findMany({
      where: {
        userId,
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
    });

    if (!favoriteStories || favoriteStories.length === 0) {
      return undefined;
    }

    return favoriteStories.map((favoriteStory) =>
      this.mapToFavoriteStoryWithDetails(favoriteStory),
    );
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
