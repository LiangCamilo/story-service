import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterMultipleStoryDto } from 'src/story/application/dtos/story-dtos/filter-multilple-story.dto';
import { FindMultipleStoryDto } from 'src/story/application/dtos/story-dtos/find-multiple-story.dto';
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

  async findByTitle(title: string): Promise<Story | null> {
    const story = await this.prisma.story.findUnique({
      where: { title: title },
    });

    if (!story) {
      return null;
    }

    return Story.create({
      id: story.id,
      title: story.title,
      description: story.description,
      userId: story.userId,
      genreId: story.genreId,
      secondaryGenreId: story.secondaryGenreId ?? undefined,
      tagIds: [],
      totalRating: story.totalRating.toNumber(),
      totalChapters: story.totalChapters,
      createdAt: story.createdAt,
      updatedAt: story.updatedAt,
    });
  }

  async findById(id: string): Promise<Story | null> {
    const story = await this.prisma.story.findUnique({
      where: { id: id },
    });

    if (!story) {
      return null;
    }

    return Story.create({
      id: story.id,
      title: story.title,
      description: story.description,
      userId: story.userId,
      genreId: story.genreId,
      secondaryGenreId: story.secondaryGenreId ?? undefined,
      tagIds: [],
      totalRating: story.totalRating.toNumber(),
      totalChapters: story.totalChapters,
      createdAt: story.createdAt,
      updatedAt: story.updatedAt,
    });
  }

  async findAndFilterMultiple(
    findMultiple: FindMultipleStoryDto,
    filterMultiple: FilterMultipleStoryDto,
  ): Promise<Story[] | null> {
    let stories: Story[] | null = null;

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

    stories = rawStories.map((story) => {
      return Story.create({
        id: story.id,
        title: story.title,
        description: story.description,
        userId: story.userId,
        genreId: story.genreId,
        secondaryGenreId: story.secondaryGenreId ?? undefined,
        totalRating: Number(story.totalRating),
        totalChapters: story.totalChapters,
        createdAt: story.createdAt,
        updatedAt: story.updatedAt,
      });
    });

    return stories;
  }

  async deleteStoryById(id: string): Promise<void> {
    await this.prisma.story.delete({
      where: { id },
    });
  }
}
