import { Inject, Injectable } from '@nestjs/common';
import {
  FAVORITE_STORY_REPOSITORY,
  FavoriteStoryRepositoryPort,
} from '../../ports/favorite-story.repository';

@Injectable()
export class FindAllFavoriteStoriesByUserIdUseCase {
  constructor(
    @Inject(FAVORITE_STORY_REPOSITORY)
    private favoriteStoryRepository: FavoriteStoryRepositoryPort,
  ) {}

  async execute(id: string) {
    return await this.favoriteStoryRepository.findFavoriteStoriesByUserId(id);
  }
}
