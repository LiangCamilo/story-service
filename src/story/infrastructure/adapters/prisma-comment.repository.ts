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
      username: dto.username,
      storyId: dto.storyId,
      chapterId: dto.chapterId,
      content: dto.content,
    }).toPrimitives();

    const { id, userId, username, content, storyId, chapterId } = data;

    if ((storyId && chapterId) || (!storyId && !chapterId)) {
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
            username,
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
        username: newComment.username,
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
            username,
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
        username: newComment.username,
        likes: newComment.likes,
        storyId: newComment.storyId ?? undefined,
        chapterId: newComment.chapterId ?? undefined,
        createdAt: newComment.createdAt,
        updatedAt: newComment.updatedAt ?? undefined,
      });
    }

    return undefined;
  }

  async delete(commentId: string): Promise<Comment | undefined> {
    return await this.prisma.$transaction(async (tx) => {
      const commentFound = await tx.comment.findUnique({
        where: {
          id: commentId,
        },
      });

      if (!commentFound) {
        return undefined;
      }

      const deletedComment = await tx.comment.delete({
        where: {
          id: commentId,
        },
      });

      if (deletedComment.storyId) {
        await tx.story.update({
          where: {
            id: deletedComment.storyId,
          },
          data: {
            totalComments: {
              decrement: 1,
            },
          },
        });
      }

      if (deletedComment.chapterId) {
        await tx.chapter.update({
          where: {
            id: deletedComment.chapterId,
          },
          data: {
            totalComments: {
              decrement: 1,
            },
          },
        });
      }

      return Comment.create({
        id: deletedComment.id,
        userId: deletedComment.userId,
        username: deletedComment.username,
        content: deletedComment.content,
        likes: deletedComment.likes,
        storyId: deletedComment.storyId ?? undefined,
        chapterId: deletedComment.chapterId ?? undefined,
        createdAt: deletedComment.createdAt,
        updatedAt: deletedComment.updatedAt ?? undefined,
      });
    });
  }
}
