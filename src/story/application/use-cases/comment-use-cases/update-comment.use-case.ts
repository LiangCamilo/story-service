import { Inject, Injectable } from '@nestjs/common';
import {
  COMMENT_REPOSITORY,
  CommentRepositoryPort,
} from '../../ports/comment.repository';
import { UpdateCommentDto } from '../../dtos/comment-dtos/update-comment.dto';
import { CommentNotFoundError } from '../../errors/comment-errors/comment-not-found.error';
import { Comment } from '../../../domain/entities/comment.entity';

@Injectable()
export class UpdateCommentUseCase {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private commentRepository: CommentRepositoryPort,
  ) {}

  async execute(
    commentId: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const updatedComment = await this.commentRepository.update(
      commentId,
      updateCommentDto.content,
    );

    if (!updatedComment) {
      throw new CommentNotFoundError(404, commentId);
    }

    return updatedComment;
  }
}
