import { FavoriteStory } from 'src/story/domain/entities/favorite-story.entity';
import { CreateFavoriteStoryDto } from '../dtos/favorite-story-dtos/create-favorite-story.dto';
import { FavoriteStoryWithDetails } from '../read-models/favorite-story-with-details.read-model';

export interface FavoriteStoryRepositoryPort {
  findFavoriteStoriesByUserId(
    userId: string,
  ): Promise<FavoriteStoryWithDetails[] | undefined>;

  create(
    createFavoriteStoryDto: CreateFavoriteStoryDto,
  ): Promise<FavoriteStory | undefined>;
}

export const FAVORITE_STORY_REPOSITORY = Symbol('FAVORITE_STORY_REPOSITORY');
