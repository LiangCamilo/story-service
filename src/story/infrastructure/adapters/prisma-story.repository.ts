import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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
        genreId: data.genreId,
        secondaryGenreId: data.secondaryGenreId,
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

  async findByName(title: string): Promise<Story | null> {
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
}
