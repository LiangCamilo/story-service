import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from 'src/story/application/dtos/comment-dtos/create-comment.dto';
import { CommentRepositoryPort } from 'src/story/application/ports/comment.repository';
import { Comment } from 'src/story/domain/entities/comment.entity';

@Injectable()
export class PrismaCommentRepository implements CommentRepositoryPort {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCommentDto): Promise<Comment | undefined> {
    const data = Comment.create({
      userId: dto.userId,
      storyId: dto.storyId,
      chapterId: dto.chapterId,
      content: dto.content,
    }).toPrimitives();

    const { id, userId, content, storyId, chapterId } = data;

    const hasStoryId = storyId !== undefined;
    const hasChapterId = chapterId !== undefined;

    if ((hasStoryId && hasChapterId) || (!hasStoryId && !hasChapterId)) {
      return undefined;
    }

    const now = new Date();

    if (storyId) {
      const storyExists = await this.prisma.story.findUnique({
        where: { id: storyId },
        select: { id: true },
      });

      if (!storyExists) {
        return undefined;
      }

      const [newComment] = await this.prisma.$transaction([
        this.prisma.comment.create({
          data: {
            id,
            userId,
            content,
            storyId,
            createdAt: now,
          },
        }),

        this.prisma.story.update({
          where: { id: storyId },
          data: {
            totalComments: {
              increment: 1,
            },
          },
        }),
      ]);

      return Comment.create({
        id: newComment.id,
        userId: newComment.userId,
        content: newComment.content,
        likes: newComment.likes,
        storyId: newComment.storyId ?? undefined,
        chapterId: newComment.chapterId ?? undefined,
        createdAt: newComment.createdAt,
        updatedAt: newComment.updatedAt ?? undefined,
      });
    }

    if (chapterId) {
      const chapterExists = await this.prisma.chapter.findUnique({
        where: { id: chapterId },
        select: { id: true },
      });

      if (!chapterExists) {
        return undefined;
      }

      const [newComment] = await this.prisma.$transaction([
        this.prisma.comment.create({
          data: {
            id,
            userId,
            content,
            chapterId,
            createdAt: now,
          },
        }),

        this.prisma.chapter.update({
          where: { id: chapterId },
          data: {
            totalComments: {
              increment: 1,
            },
          },
        }),
      ]);

      return Comment.create({
        id: newComment.id,
        userId: newComment.userId,
        content: newComment.content,
        likes: newComment.likes,
        storyId: newComment.storyId ?? undefined,
        chapterId: newComment.chapterId ?? undefined,
        createdAt: newComment.createdAt,
        updatedAt: newComment.updatedAt ?? undefined,
      });
    }

    return undefined;
  }
}
