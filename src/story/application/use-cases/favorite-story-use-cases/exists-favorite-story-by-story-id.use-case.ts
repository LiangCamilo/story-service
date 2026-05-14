import { Inject, Injectable } from '@nestjs/common';
import {
  FAVORITE_STORY_REPOSITORY,
  FavoriteStoryRepositoryPort,
} from '../../ports/favorite-story.repository';
import { ExistsFavoriteStoryDto } from '../../dtos/favorite-story-dtos/exists-favorite-story.dto';

@Injectable()
export class ExistsFavoriteStoryByStoryIdUseCase {
  constructor(
    @Inject(FAVORITE_STORY_REPOSITORY)
    private favoriteStoryRepository: FavoriteStoryRepositoryPort,
  ) {}

  async execute(existsFavoriteStoryDto: ExistsFavoriteStoryDto) {
    const { storyId, userId } = existsFavoriteStoryDto;

    const existsRating =
      await this.favoriteStoryRepository.findExistingFavorite(userId, storyId);

    return existsRating;
  }
}
