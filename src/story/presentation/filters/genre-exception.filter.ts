import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
import { GenreError } from 'src/story/application/errors/genre-errors/genre-error';

@Catch(GenreError)
export class GenreExceptionFilter implements ExceptionFilter {
  catch(exception: GenreError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus ?? 400;
    const message = exception.getMessage;
    const type = exception.getType;
    const genreId = exception.getGenreId;
    const name = exception.getName;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      errorInfo: {
        type: type ?? '',
        genreId: genreId ?? '',
        name: name ?? '',
      },
    });
  }
}
