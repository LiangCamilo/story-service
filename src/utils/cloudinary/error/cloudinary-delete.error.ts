import { CloudinaryError } from './cloudinary.error';

export class CloudinaryDeleteError extends CloudinaryError {
  constructor(message?: string, status?: number, type?: string) {
    super({
      message:
        message ??
        'La imagen no pudo ser eliminada de cloudinary por un errror desconocido',
      status: status ?? 404,
      type: type ?? 'claudinary-error',
    });
  }
}
