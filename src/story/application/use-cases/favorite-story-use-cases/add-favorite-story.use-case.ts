import { Inject, Injectable } from '@nestjs/common';
import {
  FAVORITE_STORY_REPOSITORY,
  FavoriteStoryRepositoryPort,
} from '../../ports/favorite-story.repository';
import { CreateFavoriteStoryDto } from '../../dtos/favorite-story-dtos/create-favorite-story.dto';
import { StoryNotFoundError } from '../../errors/story-errors/story-not-found.error';
import { FavoriteStoryAlreadyAddedError } from '../../errors/favorite-story-errors/favorite-story-already-added.error';

@Injectable()
export class AddFavoriteStoryUseCase {
  constructor(
    @Inject(FAVORITE_STORY_REPOSITORY)
    private favoriteStoryRepository: FavoriteStoryRepositoryPort,
  ) {}

  async execute(createFavoriteStoryDto: CreateFavoriteStoryDto) {
    const { userId, storyId } = createFavoriteStoryDto;

    const existingFavorite =
      await this.favoriteStoryRepository.findExistingFavorite(userId, storyId);

    if (existingFavorite) {
      throw new FavoriteStoryAlreadyAddedError(userId, storyId, 400);
    }

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
