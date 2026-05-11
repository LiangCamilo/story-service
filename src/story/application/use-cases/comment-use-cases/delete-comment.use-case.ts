import { Inject, Injectable } from '@nestjs/common';
import {
  COMMENT_REPOSITORY,
  CommentRepositoryPort,
} from '../../ports/comment.repository';
import { CommentNotFoundError } from '../../errors/comment-errors/comment-not-found.error';

@Injectable()
export class DeleteCommentUseCase {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private commentRepository: CommentRepositoryPort,
  ) {}
  async execute(commentId: string) {
    const deletedComment = await this.commentRepository.delete(commentId);
    if (!deletedComment) {
      throw new CommentNotFoundError(
        404,
        commentId,
        undefined,
        undefined,
        undefined,
        undefined,
      );
    }

    return deletedComment;
  }
}
