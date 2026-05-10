import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { CommentError } from 'src/story/application/errors/comment-errors/comment.error';

@Catch(CommentError)
export class CommentExceptionFilter implements ExceptionFilter {
  catch(exception: CommentError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus ?? 400;
    const chapterId = exception.getChapterId;
    const message = exception.getMessage;
    const type = exception.getType;
    const storyId = exception.getStoryId;
    const userId = exception.getUserId;
    const likes = exception.getLikes;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      errorInfo: {
        type: type ?? '',
        chapterId: chapterId ?? '',
        storyId: storyId ?? '',
        userId: userId ?? '',
        likes: likes ?? '',
      },
    });
  }
}
