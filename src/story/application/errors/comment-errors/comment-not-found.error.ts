import { CommentError } from './comment.error';

export class CommentNotFoundError extends CommentError {
  constructor(
    status: number,
    commentId: string,
    userId?: string,
    likes?: number,
    chapterId?: string,
    storyId?: string,
  ) {
    super({
      message: 'La acción no se puede realizar porque el comentario no existe',
      commentId,
      likes,
      status,
      chapterId,
      storyId,
      userId,
    });
  }
}
