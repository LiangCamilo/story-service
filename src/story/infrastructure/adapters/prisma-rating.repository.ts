import { Injectable } from '@nestjs/common';
import { RatingRepositoryPort } from 'src/story/application/ports/rating.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { Rating } from 'src/story/domain/entities/rating.entity';
import { Prisma } from 'src/generated/prisma/client';

@Injectable()
export class PrismaRatingRepository implements RatingRepositoryPort {
  constructor(private prisma: PrismaService) {}

  async createOrUpdateRating(
    storyId: string,
    userId: string,
    score: number,
  ): Promise<Rating | undefined> {
    const existingRating = await this.findRatingByStoryAndUserId(
      storyId,
      userId,
    );

    if (existingRating) {
      return this.updateRating(storyId, userId, score);
    }

    return this.createRating(storyId, userId, score);
  }

  async createRating(
    storyId: string,
    userId: string,
    score: number,
  ): Promise<Rating | undefined> {
    const data = Rating.create({
      storyId,
      userId,
      score,
    }).toPrimitives();

    const newRating = await this.prisma.$transaction(async (tx) => {
      const ratingCreated = await tx.rating.create({
        data: {
          id: data.id,
          story: {
            connect: {
              id: data.storyId,
            },
          },
          userId: data.userId,
          score: data.score,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        },
      });

      const updatedStoryStats = await tx.story.update({
        where: {
          id: data.storyId,
        },
        data: {
          ratingSum: {
            increment: data.score,
          },
          ratingCount: {
            increment: 1,
          },
        },
        select: {
          ratingSum: true,
          ratingCount: true,
        },
      });

      const average =
        Number(updatedStoryStats.ratingSum) / updatedStoryStats.ratingCount;

      await tx.story.update({
        where: {
          id: data.storyId,
        },
        data: {
          totalRating: new Prisma.Decimal(average.toFixed(2)),
        },
      });

      return ratingCreated;
    });

    return Rating.create({
      id: newRating.id,
      score: Number(newRating.score),
      storyId: newRating.storyId,
      userId: newRating.userId,
      createdAt: newRating.createdAt,
      updatedAt: newRating.updatedAt,
    });
  }

  async findRatingByStoryAndUserId(
    storyId: string,
    userId: string,
  ): Promise<Rating | undefined> {
    const rating = await this.prisma.rating.findUnique({
      where: {
        storyId_userId: {
          storyId,
          userId,
        },
      },
    });

    if (!rating) {
      return undefined;
    }

    return Rating.create({
      id: rating.id,
      userId: rating.userId,
      storyId: rating.storyId,
      score: Number(rating.score),
      createdAt: rating.createdAt,
      updatedAt: rating.updatedAt,
    });
  }

  async updateRating(
    storyId: string,
    userId: string,
    score: number,
  ): Promise<Rating | undefined> {
    const existingRating = await this.prisma.rating.findUnique({
      where: {
        storyId_userId: {
          storyId,
          userId,
        },
      },
    });

    if (!existingRating) {
      return undefined;
    }

    const oldScore = Number(existingRating.score);
    const scoreDifference = score - oldScore;

    const updatedRating = await this.prisma.$transaction(async (tx) => {
      const ratingUpdated = await tx.rating.update({
        where: {
          storyId_userId: {
            storyId,
            userId,
          },
        },
        data: {
          score,
        },
      });

      const updatedStoryStats = await tx.story.update({
        where: {
          id: storyId,
        },
        data: {
          ratingSum: {
            increment: scoreDifference,
          },
        },
        select: {
          ratingSum: true,
          ratingCount: true,
        },
      });

      const average =
        Number(updatedStoryStats.ratingSum) / updatedStoryStats.ratingCount;

      await tx.story.update({
        where: {
          id: storyId,
        },
        data: {
          totalRating: new Prisma.Decimal(average.toFixed(2)),
        },
      });

      return ratingUpdated;
    });

    return Rating.create({
      id: updatedRating.id,
      score: Number(updatedRating.score),
      storyId: updatedRating.storyId,
      userId: updatedRating.userId,
      createdAt: updatedRating.createdAt,
      updatedAt: updatedRating.updatedAt,
    });
  }
}
