import { StoryError } from './story.error';

export class StoryCoverNotFoundError extends StoryError {
  constructor(message?: string) {
    super({
      message: message ?? 'La historia no tiene una imagen de portada asignada',
      status: 404,
    });
  }
}
