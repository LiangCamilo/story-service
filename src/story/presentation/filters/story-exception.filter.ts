import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { StoryError } from 'src/story/application/errors/story-errors/story.error';

@Catch(StoryError)
export class StoryExceptionFilter implements ExceptionFilter {
  catch(exception: StoryError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus ?? 400;
    const message = exception.getMessage;
    const type = exception.getType;
    const storyId = exception.getStoryId;
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
      },
    });
  }
}
