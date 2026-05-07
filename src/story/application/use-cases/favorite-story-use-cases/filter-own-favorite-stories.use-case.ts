import { Inject, Injectable } from '@nestjs/common';
import {
  FAVORITE_STORY_REPOSITORY,
  FavoriteStoryRepositoryPort,
} from '../../ports/favorite-story.repository';

@Injectable()
export class FilterOwnFavoriteStoriesUseCase {
  constructor(
    @Inject(FAVORITE_STORY_REPOSITORY)
    favoriteStoryRepository: FavoriteStoryRepositoryPort,
  ) {}

  async execute() {}
}
