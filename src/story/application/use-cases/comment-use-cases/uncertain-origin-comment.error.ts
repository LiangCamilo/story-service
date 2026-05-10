import { CommentError } from '../../errors/comment-errors/comment.error';

export class UncertainOriginCommentError extends CommentError {
  constructor(
    status: number,
    userId?: string,
    likes?: number,
    chapterId?: string,
    storyId?: string,
  ) {
    super({
      message:
        'El comentario debe ser creado para una historia o un capitulo, pero no para ambnos ',
      likes,
      status,
      chapterId,
      storyId,
      userId,
    });
  }
}
