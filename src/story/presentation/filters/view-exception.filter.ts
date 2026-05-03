import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { ViewError } from 'src/story/application/errors/view-errors/view.error';

@Catch(ViewError)
export class ViewExceptionFilter implements ExceptionFilter {
  catch(exception: ViewError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus ?? 400;
    const userId = exception.getUserId;
    const storyId = exception.getStoryId;
    const viewId = exception.getViewId;
    const message = exception.getMessage;
    const type = exception.getType;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      errorInfo: {
        type: type ?? '',
        userId: userId ?? '',
        storyId: storyId ?? '',
        viewId: viewId ?? '',
      },
    });
  }
}
