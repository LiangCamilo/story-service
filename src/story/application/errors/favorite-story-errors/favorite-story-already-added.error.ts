import { FavoriteStoryError } from './favorite-story.error';

export class FavoriteStoryAlreadyAddedError extends FavoriteStoryError {
  constructor(userId: string, storyId: string, status?: number) {
    super({
      message: `Esta historia ya se encuentra añadida a favoritos`,
      userId,
      storyId,
      status,
    });
  }
}
