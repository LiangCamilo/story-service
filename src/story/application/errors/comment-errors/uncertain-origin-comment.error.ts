import { CommentError } from './comment.error';

export class UncertainOriginCommentError extends CommentError {
  constructor(
    status: number,
    commentId?: string,
    userId?: string,
    likes?: number,
    chapterId?: string,
    storyId?: string,
  ) {
    super({
      message:
        'El comentario debe ser creado para una historia o un capitulo, pero no para ambos ',
      commentId,
      likes,
      status,
      chapterId,
      storyId,
      userId,
    });
  }
}
