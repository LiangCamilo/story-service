import { Inject, Injectable } from '@nestjs/common';
import {
  FAVORITE_STORY_REPOSITORY,
  FavoriteStoryRepositoryPort,
} from '../../ports/favorite-story.repository';
import { RemoveStoryFromFavoriteDto } from '../../dtos/favorite-story-dtos/remove-story-from-favorite.dto';
import { FavoriteStoryNotAddedError } from '../../errors/favorite-story-errors/favorite-story-not-added.error';

@Injectable()
export class RemoveStoryFromFavoriteUseCase {
  constructor(
    @Inject(FAVORITE_STORY_REPOSITORY)
    private favoriteStoryRepository: FavoriteStoryRepositoryPort,
  ) {}

  async execute(removeStoryFromFavoriteDto: RemoveStoryFromFavoriteDto) {
    const { userId, storyId } = removeStoryFromFavoriteDto;

    const favoriteExists =
      await this.favoriteStoryRepository.findExistingFavorite(userId, storyId);

    if (!favoriteExists) {
      throw new FavoriteStoryNotAddedError(userId, storyId, 404);
    }

    return await this.favoriteStoryRepository.removeStoryFromFavorite(
      userId,
      storyId,
    );
  }
}
