import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateChapterDto } from 'src/story/application/dtos/chapter-dtos/update-chapter.dto';
import { ChapterRepositoryPort } from 'src/story/application/ports/chapter.repository';
import { ChapterWithDetails } from 'src/story/application/read-models/chapter-with-details.read-model';
import { Chapter } from 'src/story/domain/entities/chapter.entity';

@Injectable()
export class PrismaChapterRepository implements ChapterRepositoryPort {
  constructor(private prisma: PrismaService) {}

  async create(chapter: Chapter): Promise<ChapterWithDetails | undefined> {
    const data = chapter.toPrimitives();

    const storyExists = await this.prisma.story.findUnique({
      where: {
        id: data.storyId,
      },
    });

    if (!storyExists) {
      return undefined;
    }

    const allChapters = await this.prisma.chapter.findMany({
      where: {
        storyId: data.storyId,
      },
      orderBy: {
        order: 'asc',
      },
    });

    const order = allChapters.length + 1;

    const rawChapter = await this.prisma.chapter.create({
      data: {
        id: data.id,
        title: `Nueva parte #${order}`,
        content: '',
        order,
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

    await this.prisma.story.update({
      where: { id: data.storyId },
      data: {
        totalChapters: {
          increment: 1,
        },
      },
    });

    return this.mapToStoryWithDetails({
      id: rawChapter.id,
      story: {
        id: rawChapter.story.id,
        title: rawChapter.story.title,
      },
      title: rawChapter.title,
      content: rawChapter.content,
      order: rawChapter.order,
      createdAt: rawChapter.createdAt,
      updatedAt: rawChapter.updatedAt,
    });
  }

  async findChapterById(id: string): Promise<ChapterWithDetails | undefined> {
    const chapter = await this.prisma.chapter.findUnique({
      where: { id },
      include: { story: true },
    });

    if (!chapter) {
      return undefined;
    }

    if (!chapter.story) {
      return undefined;
    }

    const story: { id: string; title: string } = {
      id: chapter.story.id,
      title: chapter.story.title,
    };

    return this.mapToStoryWithDetails({
      id: chapter.id,
      title: chapter.title,
      order: chapter.order,
      story,
      content: chapter.content,
      createdAt: chapter.createdAt,
      updatedAt: chapter.updatedAt,
    });
  }

  async findAllChaptersByStoryId(storyId: string): Promise<Chapter[]> {
    const chaptersFromStory = await this.prisma.chapter.findMany({
      where: {
        storyId,
      },
    });
    return chaptersFromStory.map((chapter) => {
      return Chapter.create({
        id: chapter.id,
        title: chapter.title,
        content: chapter.content,
        order: chapter.order,
        storyId: chapter.storyId,
        createdAt: chapter.createdAt,
        updatedAt: chapter.updatedAt,
      });
    });
  }

  async deleteChapterById(
    chapterId: string,
    storyId: string,
  ): Promise<string | undefined> {
    const chapterFound = await this.prisma.chapter.findUnique({
      where: { id: chapterId, storyId },
    });

    if (!chapterFound) {
      return undefined;
    }

    const operation = await this.prisma.$transaction([
      this.prisma.chapter.delete({
        where: { id: chapterId },
      }),

      this.prisma.chapter.updateMany({
        where: {
          storyId,
          order: { gt: chapterFound.order },
        },
        data: {
          order: { decrement: 1 },
        },
      }),

      this.prisma.story.update({
        where: { id: storyId },
        data: {
          totalChapters: {
            decrement: 1,
          },
        },
      }),
    ]);

    return operation[0].title;
  }

  async updateChapter(
    id: string,
    updateChapterDto: UpdateChapterDto,
  ): Promise<Chapter> {
    const { content, title } = updateChapterDto;

    const chapter = await this.prisma.chapter.update({
      where: { id },
      data: {
        ...(title && {
          title,
        }),
        ...(content && {
          content,
        }),
      },
    });

    return Chapter.create({
      id,
      title: chapter.title,
      content: chapter.content,
      order: chapter.order,
      storyId: chapter.storyId,
      createdAt: chapter.createdAt,
      updatedAt: chapter.updatedAt,
    });
  }

  private mapToStoryWithDetails(chapter: {
    id: string;
    title: string;
    order: number;
    story: {
      id: string;
      title: string;
    };
    content: string;
    createdAt: Date;
    updatedAt: Date;
  }): ChapterWithDetails {
    return {
      id: chapter.id,
      title: chapter.title,
      order: chapter.order,
      story: chapter.story,
      content: chapter.content,
      createdAt: chapter.createdAt,
      updatedAt: chapter.updatedAt,
    };
  }
}
