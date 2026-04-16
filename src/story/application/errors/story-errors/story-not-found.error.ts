import { StoryError } from './story.error';

export class StoryNotFoundError extends StoryError {
  constructor(storyId: string, title: string) {
    super({
      message: `La historia solicitada no fue encontrada`,
      storyId,
      title,
    });
  }
}
