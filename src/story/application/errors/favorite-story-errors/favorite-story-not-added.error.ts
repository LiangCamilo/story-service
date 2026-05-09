import { FavoriteStoryError } from './favorite-story.error';

export class FavoriteStoryNotAddedError extends FavoriteStoryError {
  constructor(userId: string, storyId: string, status?: number) {
    super({
      message: `Esta historia no se encuentra presente en los favoritos`,
      userId,
      storyId,
      status,
    });
  }
}
