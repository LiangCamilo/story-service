import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterMultipleStoryDto } from 'src/story/application/dtos/story-dtos/filter-multilple-story.dto';
import { FindMultipleStoryDto } from 'src/story/application/dtos/story-dtos/find-multiple-story.dto';
import { StoryWithDetails } from 'src/story/application/read-models/story-with-details.read-model';
import {
  StoryRepositoryPort,
  UpdateStoryData,
} from 'src/story/application/ports/story.repository';
import { Story } from 'src/story/domain/entities/story.entity';
import { AllowedStatus } from 'src/story/domain/constants/story-constants/story-status.constants';

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
        coverUrl: data.coverUrl,
        userEmail: data.userEmail,
        hidden: data.hidden,
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
      userEmail: newStory.userEmail,
      genreId: newStory.genreId,
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
    findMultiple: FindMultipleStoryDto,
    filterMultiple: FilterMultipleStoryDto,
  ): Promise<StoryWithDetails[]> {
    const {
      genreName,
      secondaryGenreName,
      status,
      title,
      totalChapters,
      totalRating,
      totalViews,
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
      skip: findMultiple.offset,
      take: findMultiple.limit,
      where: {
        // hidden: false,
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
      },
      include: {
        genre: true,
        secondaryGenre: true,
        tags: true,
      },
    });

    return this.mapToStoryWithDetails(updatedStory);
  }

  private mapToStoryWithDetails(story: {
    id: string;
    title: string;
    description: string;
    coverUrl: string;
    userEmail: string;
    hidden: boolean;
    userId: string;
    genre: { id: string; name: string };
    secondaryGenre: { id: string; name: string } | null;
    tags: { id: string; name: string }[];
    totalRating: any;
    totalChapters: number;
    totalViews: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  }): StoryWithDetails {
    return {
      id: story.id,
      title: story.title,
      description: story.description,
      coverUrl: story.coverUrl,
      userEmail: story.userEmail,
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
      totalChapters: story.totalChapters,
      totalViews: story.totalViews,
      status: story.status,
      createdAt: story.createdAt,
      updatedAt: story.updatedAt,
    };
  }
}
