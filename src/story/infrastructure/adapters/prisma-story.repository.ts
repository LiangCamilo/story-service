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
      },
      include: {
        tags: true,
      },
    });

    return new Story({
      id: Id(),
    });
  }

  async findByName(title: string): Promise<Story | null> {
    const story: Story = await this.prisma.story.findUnique({
      where: { title: title },
    });

    if (!story) {
      return null;
    }

    return story;
  }
}
