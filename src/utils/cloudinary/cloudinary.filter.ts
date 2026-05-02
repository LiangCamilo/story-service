import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { CloudinaryError } from './error/cloudinary.error';

@Catch(CloudinaryError)
export class CloudinaryExceptionFilter implements ExceptionFilter {
  catch(exception: CloudinaryError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus ?? 400;
    const message = exception.getMessage;
    const type = exception.getType;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      errorInfo: {
        type: type ?? '',
      },
    });
  }
}
