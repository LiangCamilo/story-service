import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterMultipleStoryDto } from 'src/story/application/dtos/story-dtos/filter-multilple-story.dto';
import { StoryWithDetails } from 'src/story/application/read-models/story-with-details.read-model';
import {
  StoryRepositoryPort,
  UpdateStoryData,
} from 'src/story/application/ports/story.repository';
import { Story } from 'src/story/domain/entities/story.entity';
import { AllowedStatus } from 'src/story/domain/constants/story-constants/story-status.constants';
import { FilterMyStoriesDto } from 'src/story/application/dtos/story-dtos/filter-my-stories.dto';

@Injectable()
export class PrismaStoryRepository implements StoryRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async createStory(story: Story): Promise<Story> {
    const data = story.toPrimitives();

    const newStory = await this.prisma.story.create({
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        coverUrl: data.coverUrl ?? '',
        hidden: true,
        userId: data.userId,
        genre: {
          connect: {
            id: data.genreId,
          },
        },
        ...(data.secondaryGenreId && {
          secondaryGenre: {
            connect: {
              id: data.secondaryGenreId,
            },
          },
        }),
        ...(data.tagIds.length > 0 && {
          tags: {
            connect: data.tagIds.map((id) => ({ id })),
          },
        }),
        totalRating: data.totalRating,
        totalChapters: data.totalChapters,
      },
      include: {
        tags: true,
      },
    });

    return Story.create({
      title: newStory.title,
      description: newStory.description,
      userId: newStory.userId,
      genreId: newStory.genreId,
      hidden: newStory.hidden,
      coverUrl: newStory.coverUrl,
      secondaryGenreId: newStory.secondaryGenreId ?? undefined,
      tagIds: data.tagIds,
      totalRating: Number(newStory.totalRating),
      totalChapters: Number(newStory.totalChapters),
      id: newStory.id,
      createdAt: newStory.createdAt,
      updatedAt: newStory.updatedAt,
    });
  }

  async findByTitle(title: string): Promise<StoryWithDetails | undefined> {
    const story = await this.prisma.story.findUnique({
      where: { title },
      include: {
        genre: true,
        secondaryGenre: true,
        tags: true,
      },
    });

    if (!story) {
      return undefined;
    }

    return this.mapToStoryWithDetails(story);
  }

  async findById(id: string): Promise<StoryWithDetails | undefined> {
    const story = await this.prisma.story.findUnique({
      where: { id },
      include: {
        genre: true,
        secondaryGenre: true,
        tags: true,
      },
    });

    if (!story) {
      return undefined;
    }

    return this.mapToStoryWithDetails(story);
  }

  async findAndFilterMultiple(
    filterMultiple: FilterMultipleStoryDto,
  ): Promise<StoryWithDetails[]> {
    const {
      limit,
      offset,
      genreName,
      secondaryGenreName,
      status,
      title,
      totalChapters,
      totalRating,
      totalViews,
      userId,
      tagNames,
    } = filterMultiple;

    const orderBy: Array<any> = [];

    if (totalViews !== undefined) {
      orderBy.push({
        totalViews: totalViews ? 'desc' : 'asc',
      });
    }

    if (totalRating !== undefined) {
      orderBy.push({
        totalRating: totalRating ? 'desc' : 'asc',
      });
    }

    if (totalChapters !== undefined) {
      orderBy.push({
        totalChapters: totalChapters ? 'desc' : 'asc',
      });
    }

    const rawStories = await this.prisma.story.findMany({
      skip: offset,
      take: limit,
      where: {
        hidden: false,
        ...(userId && {
          userId,
        }),
        ...(title && {
          title: {
            contains: title,
            mode: 'insensitive',
          },
        }),
        ...(status && {
          status,
        }),
        ...(genreName && {
          genre: {
            name: {
              contains: genreName,
              mode: 'insensitive',
            },
          },
        }),
        ...(secondaryGenreName && {
          secondaryGenre: {
            name: {
              contains: secondaryGenreName,
              mode: 'insensitive',
            },
          },
        }),
        ...(tagNames &&
          tagNames.length > 0 && {
            tags: {
              some: {
                name: {
                  in: tagNames,
                  mode: 'insensitive',
                },
              },
            },
          }),
      },
      include: {
        genre: true,
        secondaryGenre: true,
        tags: true,
      },
      orderBy,
    });

    return rawStories.map((story) => this.mapToStoryWithDetails(story));
  }

  async findAndFilterMyStories(
    userId: string,
    dto: FilterMyStoriesDto,
  ): Promise<StoryWithDetails[]> {
    const {
      limit,
      offset,
      genreName,
      secondaryGenreName,
      status,
      title,
      totalChapters,
      totalRating,
      totalViews,
      hidden,
      tagNames,
    } = dto;

    const orderBy: Array<any> = [];

    if (totalViews !== undefined) {
      orderBy.push({
        totalViews: totalViews ? 'desc' : 'asc',
      });
    }

    if (totalRating !== undefined) {
      orderBy.push({
        totalRating: totalRating ? 'desc' : 'asc',
      });
    }

    if (totalChapters !== undefined) {
      orderBy.push({
        totalChapters: totalChapters ? 'desc' : 'asc',
      });
    }

    const rawStories = await this.prisma.story.findMany({
      skip: offset,
      take: limit,
      where: {
        userId,
        ...(hidden !== undefined && {
          hidden,
        }),
        ...(title && {
          title: {
            contains: title,
            mode: 'insensitive',
          },
        }),
        ...(status && {
          status,
        }),
        ...(genreName && {
          genre: {
            name: {
              contains: genreName,
              mode: 'insensitive',
            },
          },
        }),
        ...(secondaryGenreName && {
          secondaryGenre: {
            name: {
              contains: secondaryGenreName,
              mode: 'insensitive',
            },
          },
        }),
        ...(tagNames &&
          tagNames.length > 0 && {
            tags: {
              some: {
                name: {
                  in: tagNames,
                  mode: 'insensitive',
                },
              },
            },
          }),
      },
      include: {
        genre: true,
        secondaryGenre: true,
        tags: true,
      },
      orderBy,
    });

    return rawStories.map((story) => this.mapToStoryWithDetails(story));
  }

  async deleteStoryById(id: string): Promise<void> {
    await this.prisma.story.delete({
      where: { id },
    });
  }

  async updateStory(
    id: string,
    data: UpdateStoryData,
  ): Promise<StoryWithDetails> {
    const updatedStory = await this.prisma.story.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description && { description: data.description }),
        ...(data.status && { status: data.status as AllowedStatus }),
        ...(data.coverUrl && { coverUrl: data.coverUrl }),
        ...(data.genreId && {
          genre: {
            connect: { id: data.genreId },
          },
        }),
        ...(data.secondaryGenreId && {
          secondaryGenre: {
            connect: { id: data.secondaryGenreId },
          },
        }),
        updatedAt: new Date(),
      },
      include: {
        genre: true,
        secondaryGenre: true,
        tags: true,
      },
    });

    return this.mapToStoryWithDetails(updatedStory);
  }

  async toggleHidden(id: string): Promise<Story | undefined> {
    const existingStory = await this.prisma.story.findUnique({
      where: { id },
    });

    if (!existingStory) {
      return undefined;
    }

    const updatedStory = await this.prisma.story.update({
      where: { id },
      data: {
        hidden: !existingStory.hidden,
        updatedAt: new Date(),
      },
    });

    return Story.create({
      id: updatedStory.id,
      title: updatedStory.title,
      userId: updatedStory.userId,
      description: updatedStory.description,
      genreId: updatedStory.genreId,
      hidden: updatedStory.hidden,
      coverUrl: updatedStory.coverUrl,
      ratingCount: updatedStory.ratingCount,
      ratingSum: Number(updatedStory.ratingSum),
      totalRating: Number(updatedStory.totalRating),
      totalChapters: updatedStory.totalChapters,
      secondaryGenreId: updatedStory.secondaryGenreId ?? undefined,
      totalFavorite: updatedStory.totalFavorite,
      totalViews: updatedStory.totalViews,
      status: updatedStory.status,
      createdAt: updatedStory.createdAt,
      updatedAt: updatedStory.updatedAt,
    });
  }

  private mapToStoryWithDetails(story: {
    id: string;
    title: string;
    description: string;
    coverUrl: string;
    hidden: boolean;
    userId: string;
    genre: { id: string; name: string };
    secondaryGenre: { id: string; name: string } | null;
    tags: { id: string; name: string }[];
    totalRating: any;
    ratingSum: any;
    ratingCount: number;
    totalChapters: number;
    totalViews: number;
    totalFavorite: number;
    status: string;
    createdAt: Date;
    updatedAt: Date | null;
  }): StoryWithDetails {
    return {
      id: story.id,
      title: story.title,
      description: story.description,
      coverUrl: story.coverUrl === '' ? null : story.coverUrl,
      hidden: story.hidden,
      userId: story.userId,
      genre: { id: story.genre.id, name: story.genre.name },
      ...(story.secondaryGenre && {
        secondaryGenre: {
          id: story.secondaryGenre.id,
          name: story.secondaryGenre.name,
        },
      }),
      tags: story.tags.map((tag) => ({ id: tag.id, name: tag.name })),
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
