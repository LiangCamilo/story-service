import { StoryError } from './story.error';

export class StoryNotFoundError extends StoryError {
  constructor(status?: number, title?: string, storyId?: string) {
    super({
      message: `La historia solicitada no fue encontrada`,
      storyId,
      title,
      status,
    });
  }
}
