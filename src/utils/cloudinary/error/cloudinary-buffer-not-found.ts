import { CloudinaryError } from './cloudinary.error';

export class CloudinaryFileNotFound extends CloudinaryError {
  constructor(message?: string, status?: number, type?: string) {
    super({
      message: message ?? 'La imagen no pudo ser encontrada',
      status: status ?? 404,
      type: type ?? 'claudinary-error',
    });
  }
}
