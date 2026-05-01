import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterMultipleStoryDto } from 'src/story/application/dtos/story-dtos/filter-multilple-story.dto';
import { FindMultipleStoryDto } from 'src/story/application/dtos/story-dtos/find-multiple-story.dto';
import { StoryWithDetails } from 'src/story/application/read-models/story-with-details.read-model';
import { StoryRepositoryPort } from 'src/story/application/ports/story.repository';
import { Story } from 'src/story/domain/entities/story.entity';

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
      genreId: newStory.genreId,
      secondaryGenreId: newStory.secondaryGenreId ?? undefined,
      tagIds: data.tagIds,
      totalRating: Number(newStory.totalRating),
      totalChapters: Number(newStory.totalChapters),
      id: newStory.id,
      createdAt: newStory.createdAt,
      updatedAt: newStory.updatedAt,
    });
  }

  async findByTitle(title: string): Promise<StoryWithDetails | null> {
    const story = await this.prisma.story.findUnique({
      where: { title },
      include: {
        genre: true,
        secondaryGenre: true,
        tags: true,
      },
    });

    if (!story) {
      return null;
    }

    return this.mapToStoryWithDetails(story);
  }

  async findById(id: string): Promise<StoryWithDetails | null> {
    const story = await this.prisma.story.findUnique({
      where: { id },
      include: {
        genre: true,
        secondaryGenre: true,
        tags: true,
      },
    });

    if (!story) {
      return null;
    }

    return this.mapToStoryWithDetails(story);
  }

  async findAndFilterMultiple(
    findMultiple: FindMultipleStoryDto,
    filterMultiple: FilterMultipleStoryDto,
  ): Promise<StoryWithDetails[]> {
    const {
      genreId,
      secondaryGenreId,
      status,
      title,
      totalChapters,
      totalRating,
      totalViews,
    } = filterMultiple;

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
        ...(genreId && {
          genreId: genreId,
        }),
        ...(secondaryGenreId && {
          secondaryGenreId,
        }),
      },
      include: {
        genre: true,
        secondaryGenre: true,
        tags: true,
      },
      orderBy: [
        {
          totalViews: totalViews ? 'desc' : 'asc',
        },
        {
          totalChapters: totalChapters ? 'desc' : 'asc',
        },
        {
          totalRating: totalRating ? 'desc' : 'asc',
        },
      ],
    });

    return rawStories.map((story) => this.mapToStoryWithDetails(story));
  }

  async deleteStoryById(id: string): Promise<void> {
    await this.prisma.story.delete({
      where: { id },
    });
  }

  private mapToStoryWithDetails(story: {
    id: string;
    title: string;
    description: string;
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
