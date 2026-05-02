import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { ChapterError } from 'src/story/application/errors/chapter-errors/chapter.error';

@Catch(ChapterError)
export class ChapterExceptionFilter implements ExceptionFilter {
  catch(exception: ChapterError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus ?? 400;
    const chapterId = exception.getChapterId;
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
        chapterId: chapterId ?? '',
        storyId: storyId ?? '',
        title: title ?? '',
      },
    });
  }
}
