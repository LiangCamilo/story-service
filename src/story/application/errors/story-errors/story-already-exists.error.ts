import { StoryError } from './story.error';

export class StoryAlreadyExistsError extends StoryError {
  constructor(title: string) {
    super({
      message: `La titulo "${title}" ya se encuentra ocupado por otra historia`,
      title,
    });
  }
}
