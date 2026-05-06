import { Inject, Injectable } from '@nestjs/common';
import {
  FAVORITE_STORY_REPOSITORY,
  FavoriteStoryRepositoryPort,
} from '../../ports/favorite-story.repository';
import { CreateFavoriteStoryDto } from '../../dtos/favorite-story-dtos/create-favorite-story.dto';
import { StoryNotFoundError } from '../../errors/story-errors/story-not-found.error';

@Injectable()
export class AddFavoriteStoryUseCase {
  constructor(
    @Inject(FAVORITE_STORY_REPOSITORY)
    private favoriteStoryRepository: FavoriteStoryRepositoryPort,
  ) {}

  async execute(createFavoriteStoryDto: CreateFavoriteStoryDto) {
    const addFavorite = await this.favoriteStoryRepository.create(
      createFavoriteStoryDto,
    );

    if (!addFavorite) {
      throw new StoryNotFoundError(
        404,
        undefined,
        createFavoriteStoryDto.storyId,
      );
    }

    return addFavorite;
  }
}
