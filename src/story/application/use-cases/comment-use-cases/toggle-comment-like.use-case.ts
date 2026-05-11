import { Inject, Injectable } from '@nestjs/common';
import {
  COMMENT_REPOSITORY,
  CommentRepositoryPort,
} from '../../ports/comment.repository';
import { CommentNotFoundError } from '../../errors/comment-errors/comment-not-found.error';
import { Comment } from '../../../domain/entities/comment.entity';

@Injectable()
export class ToggleCommentLikeUseCase {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private commentRepository: CommentRepositoryPort,
  ) {}

  async execute(commentId: string, userId: string): Promise<Comment> {
    const updatedComment = await this.commentRepository.toggleLike(
      commentId,
      userId,
    );

    if (!updatedComment) {
      throw new CommentNotFoundError(404, commentId);
    }

    return updatedComment;
  }
}
