import { StoryError } from './story.error';

export class StoriesNotFoundError extends StoryError {
  constructor(status?: number, title?: string, storyId?: string) {
    super({
      message: `No se ha encontrado ninguna historia`,
      storyId,
      title,
      status,
    });
  }
}
