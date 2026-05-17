import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindAllChaptersDto } from 'src/story/application/dtos/chapter-dtos/find-all-chapters.dto';
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
    const now = new Date();

    const [rawChapter] = await this.prisma.$transaction([
      this.prisma.chapter.create({
        data: {
          id: data.id,
          title: '',
          content: '',
          order,
          story: {
            connect: {
              id: data.storyId,
            },
          },
          createdAt: now,
          lastActivityAt: now,
        },
        include: {
          story: true,
        },
      }),

      this.prisma.story.update({
        where: { id: data.storyId },
        data: {
          totalChapters: {
            increment: 1,
          },
          lastActivityAt: now,
        },
      }),
    ]);

    return this.mapToChapterWithDetails({
      id: rawChapter.id,
      story: {
        id: rawChapter.story.id,
        title: rawChapter.story.title,
      },
      title: rawChapter.title === '' ? null : rawChapter.title,
      hidden: rawChapter.hidden,
      content: rawChapter.content,
      order: rawChapter.order,
      totalComments: rawChapter.totalComments,
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

    return this.mapToChapterWithDetails({
      id: chapter.id,
      title: chapter.title !== '' ? chapter.title : null,
      order: chapter.order,
      story,
      content: chapter.content,
      hidden: chapter.hidden,
      totalComments: chapter.totalComments,
      createdAt: chapter.createdAt,
      updatedAt: chapter.updatedAt,
    });
  }

  async findAllChaptersByStoryId(
    storyId: string,
    findAllChaptersDto: FindAllChaptersDto,
  ): Promise<{ chapters: ChapterWithDetails[]; totalItems: number }> {
    const { limit, offset, newestFirst } = findAllChaptersDto;
    const where = {
      storyId,
      hidden: false,
    };

    const page = (offset - 1) * limit;
    const skip = page;

    const take = limit;
    const orderDirection =
      newestFirst === false ? ('asc' as const) : ('desc' as const);

    const orderBy =
      newestFirst !== undefined
        ? [
            {
              createdAt: orderDirection,
            },
            {
              id: orderDirection,
            },
          ]
        : [
            {
              order: 'asc' as const,
            },
            {
              id: 'asc' as const,
            },
          ];

    const [rawChapters, totalItems] = await this.prisma.$transaction([
      this.prisma.chapter.findMany({
        skip,
        take,
        where,
        include: {
          story: true,
        },
        orderBy,
      }),
      this.prisma.chapter.count({
        where,
      }),
    ]);

    return {
      chapters: rawChapters.map((chapter) => {
        return this.mapToChapterWithDetails({
          id: chapter.id,
          story: {
            id: chapter.story.id,
            title: chapter.story.title,
          },
          title: chapter.title,
          hidden: chapter.hidden,
          content: chapter.content,
          order: chapter.order,
          totalComments: chapter.totalComments,
          createdAt: chapter.createdAt,
          updatedAt: chapter.updatedAt,
        });
      }),
      totalItems,
    };
  }

  async findChaptersByOwnedStoryId(
    storyId: string,
    findAllChaptersDto: FindAllChaptersDto,
  ): Promise<{ chapters: ChapterWithDetails[]; totalItems: number }> {
    const { limit, offset, newestFirst } = findAllChaptersDto;

    const take = Math.max(limit ?? 10, 1);
    const page = Math.max(offset ?? 1, 1);
    const skip = (page - 1) * take;

    const where = {
      storyId,
    };

    const orderDirection = newestFirst ? ('desc' as const) : ('asc' as const);

    const orderBy =
      newestFirst !== undefined
        ? [
            {
              createdAt: orderDirection,
            },
            {
              id: orderDirection,
            },
          ]
        : [
            {
              order: 'asc' as const,
            },
            {
              id: 'asc' as const,
            },
          ];

    const [rawChapters, totalItems] = await this.prisma.$transaction([
      this.prisma.chapter.findMany({
        skip,
        take,
        where,
        include: {
          story: true,
        },
        orderBy,
      }),
      this.prisma.chapter.count({
        where,
      }),
    ]);

    return {
      chapters: rawChapters.map((chapter) => {
        return this.mapToChapterWithDetails({
          id: chapter.id,
          story: {
            id: chapter.story.id,
            title: chapter.story.title,
          },
          title: chapter.title !== '' ? chapter.title : null,
          hidden: chapter.hidden,
          content: chapter.content,
          order: chapter.order,
          totalComments: chapter.totalComments,
          createdAt: chapter.createdAt,
          updatedAt: chapter.updatedAt,
        });
      }),
      totalItems,
    };
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
          lastActivityAt: new Date(),
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
    const now = new Date();

    const chapter = await this.prisma.chapter.update({
      where: { id },
      data: {
        ...(title && {
          title,
        }),
        ...(content && {
          content,
        }),
        updatedAt: now,
        lastActivityAt: now,
      },
    });

    await this.prisma.story.update({
      where: { id: chapter.storyId },
      data: { lastActivityAt: now },
    });

    return Chapter.create({
      id: chapter.id,
      content: chapter.content,
      order: chapter.order,
      storyId: chapter.storyId,
      title: chapter.title,
      totalComments: chapter.totalComments,
      hidden: chapter.hidden,
      createdAt: chapter.createdAt,
      updatedAt: chapter.updatedAt,
    });
  }

  async toggleHidden(id: string) {
    const existingChapter = await this.prisma.chapter.findUnique({
      where: { id },
    });

    if (!existingChapter) {
      return undefined;
    }

    const now = new Date();
    const updatedStory = await this.prisma.chapter.update({
      where: { id },
      data: {
        hidden: !existingChapter.hidden,
        updatedAt: now,
      },
    });

    await this.prisma.story.update({
      where: { id: updatedStory.storyId },
      data: { lastActivityAt: now },
    });

    return Chapter.create({
      id: updatedStory.id,
      content: updatedStory.content,
      hidden: updatedStory.hidden,
      order: updatedStory.order,
      storyId: updatedStory.storyId,
      title: updatedStory.title,
      totalComments: updatedStory.totalComments,
      createdAt: updatedStory.createdAt,
      updatedAt: updatedStory.updatedAt,
    });
  }

  private mapToChapterWithDetails(chapter: {
    id: string;
    title: string | null;
    order: number;
    story: {
      id: string;
      title: string;
    };
    hidden: boolean;
    content: string;
    totalComments: number;
    createdAt: Date;
    updatedAt: Date | null;
  }): ChapterWithDetails {
    return {
      id: chapter.id,
      title: chapter.title,
      order: chapter.order,
      story: chapter.story,
      hidden: chapter.hidden ?? true,
      content: chapter.content,
      totalComments: chapter.totalComments,
      createdAt: chapter.createdAt,
      updatedAt: chapter.updatedAt,
    };
  }
}
