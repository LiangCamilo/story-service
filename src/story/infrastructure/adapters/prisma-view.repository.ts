import { PrismaService } from 'src/prisma/prisma.service';
import { ViewRepositoryPort } from 'src/story/application/ports/view.repository';
import { View } from 'src/story/domain/entities/view.entity';

export class PrismaViewRepository implements ViewRepositoryPort {
  constructor(private prisma: PrismaService) {}

  async createView(storyId: string, userId: string): Promise<View | undefined> {
    const existsView = await this.prisma.view.findUnique({
      where: {
        storyId_userId: {
          storyId,
          userId,
        },
      },
    });

    if (!existsView) {
      return undefined;
    }

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

    return View.create({
      id: newView.id,
      storyId: newView.storyId,
      userId: newView.userId,
      createdAt: newView.createdAt,
      updatedAt: newView.updatedAt,
    });
  }
}
