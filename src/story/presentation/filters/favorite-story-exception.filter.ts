import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { FavoriteStoryError } from 'src/story/application/errors/favorite-story-errors/favorite-story.error';

@Catch(FavoriteStoryError)
export class FavoriteStoryExceptionFilter implements ExceptionFilter {
  catch(exception: FavoriteStoryError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus ?? 400;
    const message = exception.getMessage;
    const type = exception.getType;
    const storyId = exception.getStoryId;
    const userId = exception.getUserId;
    const title = exception.getTitle;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      errorInfo: {
        type: type ?? '',
        storyId: storyId ?? '',
        title: title ?? '',
        userId: userId ?? '',
      },
    });
  }
}
