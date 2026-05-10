import { Inject, Injectable } from '@nestjs/common';
import {
  FAVORITE_STORY_REPOSITORY,
  FavoriteStoryRepositoryPort,
} from '../../ports/favorite-story.repository';
import { FilterFavoriteStoriesDto } from '../../dtos/favorite-story-dtos/filter-favorite-stories.dto';

@Injectable()
export class FilterOwnFavoriteStoriesUseCase {
  constructor(
    @Inject(FAVORITE_STORY_REPOSITORY)
    private favoriteStoryRepository: FavoriteStoryRepositoryPort,
  ) {}

  async execute(
    userId: string,
    filterFavoriteStoriesDto: FilterFavoriteStoriesDto,
  ) {
    const { limit, offset } = filterFavoriteStoriesDto;

    const { stories: filteredFavoriteStories, totalItems } =
      await this.favoriteStoryRepository.filterFavoriteStories(
        userId,
        filterFavoriteStoriesDto,
      );

    const pageSize: number = limit;
    const totalPages = Math.ceil(totalItems / pageSize);
    const numberPage = Math.floor(offset / limit) + 1;

    return {
      filteredFavoriteStories,
      meta: {
        totalItems,
        pageSize,
        totalPages,
        numberPage,
      },
    };
  }
}
