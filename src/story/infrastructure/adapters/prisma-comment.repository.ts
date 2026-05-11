import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from 'src/story/application/dtos/comment-dtos/create-comment.dto';
import { SearchCommentDto } from 'src/story/application/dtos/comment-dtos/search-comment.dto';
import { CommentRepositoryPort } from 'src/story/application/ports/comment.repository';
import { Comment } from 'src/story/domain/entities/comment.entity';
import { Id } from 'src/story/domain/value-objects/id.vo';

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

  async update(
    commentId: string,
    content: string,
  ): Promise<Comment | undefined> {
    const commentFound = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!commentFound) {
      return undefined;
    }

    const updatedComment = await this.prisma.comment.update({
      where: { id: commentId },
      data: {
        content,
        updatedAt: new Date(),
      },
    });

    return Comment.create({
      id: updatedComment.id,
      userId: updatedComment.userId,
      username: updatedComment.username,
      content: updatedComment.content,
      likes: updatedComment.likes,
      storyId: updatedComment.storyId ?? undefined,
      chapterId: updatedComment.chapterId ?? undefined,
      createdAt: updatedComment.createdAt,
      updatedAt: updatedComment.updatedAt ?? undefined,
    });
  }

  async searchChapterComments(
    chapterId: string,
    searchCommentDto: SearchCommentDto,
  ): Promise<{ comments: Comment[]; totalItems: number }> {
    const { limit, offset } = searchCommentDto;

    const where = {
      chapterId,
    };

    const [rawComments, totalItems] = await this.prisma.$transaction([
      this.prisma.comment.findMany({
        skip: offset,
        take: limit,
        where,
      }),
      this.prisma.comment.count({ where }),
    ]);

    return {
      comments: rawComments.map((comment) =>
        Comment.create({
          id: comment.id,
          content: comment.content,
          userId: comment.userId,
          username: comment.username,
          likes: comment.likes,
          chapterId: comment.chapterId ?? undefined,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt ?? undefined,
        }),
      ),
      totalItems,
    };
  }

  async searchStoryComments(
    storyId: string,
    searchCommentDto: SearchCommentDto,
  ): Promise<{ comments: Comment[]; totalItems: number }> {
    const { limit, offset } = searchCommentDto;

    const where = {
      storyId,
    };

    const [rawComments, totalItems] = await this.prisma.$transaction([
      this.prisma.comment.findMany({
        skip: offset,
        take: limit,
        where,
      }),
      this.prisma.comment.count({ where }),
    ]);

    return {
      comments: rawComments.map((comment) =>
        Comment.create({
          id: comment.id,
          content: comment.content,
          userId: comment.userId,
          username: comment.username,
          likes: comment.likes,
          storyId: comment.storyId ?? undefined,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt ?? undefined,
        }),
      ),
      totalItems,
    };
  }

  async toggleLike(
    commentId: string,
    userId: string,
  ): Promise<Comment | undefined> {
    const commentFound = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!commentFound) {
      return undefined;
    }

    const likeFound = await this.prisma.commentLike.findUnique({
      where: {
        commentId_userId: {
          commentId,
          userId,
        },
      },
    });

    let updatedComment;

    if (likeFound) {
      await this.prisma.$transaction([
        this.prisma.commentLike.delete({
          where: { id: likeFound.id },
        }),
        this.prisma.comment.update({
          where: { id: commentId },
          data: {
            likes: { decrement: 1 },
          },
        }),
      ]);

      updatedComment = await this.prisma.comment.findUnique({
        where: { id: commentId },
      });
    } else {
      await this.prisma.$transaction([
        this.prisma.commentLike.create({
          data: {
            id: new Id().getValue,
            commentId,
            userId,
          },
        }),
        this.prisma.comment.update({
          where: { id: commentId },
          data: {
            likes: { increment: 1 },
          },
        }),
      ]);

      updatedComment = await this.prisma.comment.findUnique({
        where: { id: commentId },
      });
    }

    if (!updatedComment) return undefined;

    return Comment.create({
      id: updatedComment.id,
      userId: updatedComment.userId,
      username: updatedComment.username,
      content: updatedComment.content,
      likes: updatedComment.likes,
      storyId: updatedComment.storyId ?? undefined,
      chapterId: updatedComment.chapterId ?? undefined,
      createdAt: updatedComment.createdAt,
      updatedAt: updatedComment.updatedAt ?? undefined,
    });
  }
}
