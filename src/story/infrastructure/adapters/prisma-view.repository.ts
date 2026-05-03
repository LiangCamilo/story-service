import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ViewRepositoryPort } from 'src/story/application/ports/view.repository';
import { View } from 'src/story/domain/entities/view.entity';

@Injectable()
export class PrismaViewRepository implements ViewRepositoryPort {
  constructor(private prisma: PrismaService) {}

  async findViewByStoryAndUserId(
    storyId: string,
    userId: string,
  ): Promise<View | undefined> {
    const view = await this.prisma.view.findUnique({
      where: {
        storyId_userId: {
          storyId,
          userId,
        },
      },
    });

    if (!view) {
      return undefined;
    }

    return View.create({
      id: view.id,
      storyId: view.storyId,
      userId: view.userId,
      createdAt: view.createdAt,
      updatedAt: view.updatedAt,
    });
  }

  async createView(storyId: string, userId: string): Promise<View | undefined> {
    const data = View.create({
      storyId,
      userId,
    }).toPrimitives();

    const newView = await this.prisma.view.create({
      data: {
        id: data.id,
        story: {
          connect: {
            id: data.storyId,
          },
        },
        userId,
      },
    });

    await this.prisma.story.update({
      where: {
        id: storyId,
      },
      data: {
        totalViews: {
          increment: 1,
        },
      },
    });

    return View.create({
      id: newView.id,
      storyId: newView.storyId,
      userId: newView.userId,
      createdAt: newView.createdAt,
      updatedAt: newView.updatedAt,
    });
  }
}
