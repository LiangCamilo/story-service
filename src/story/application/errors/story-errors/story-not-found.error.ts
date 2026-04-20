import { StoryError } from './story.error';

export class StoryNotFoundError extends StoryError {
  constructor(title: string, storyId?: string) {
    super({
      message: `La historia solicitada no fue encontrada`,
      storyId,
      title,
    });
  }
}
