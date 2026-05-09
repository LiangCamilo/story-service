import { FavoriteStory } from 'src/story/domain/entities/favorite-story.entity';
import { CreateFavoriteStoryDto } from '../dtos/favorite-story-dtos/create-favorite-story.dto';
import { StoryWithDetails } from '../read-models/story-with-details.read-model';
import { FilterFavoriteStoriesDto } from '../dtos/favorite-story-dtos/filter-favorite-stories.dto';

export interface FavoriteStoryRepositoryPort {
  create(
    createFavoriteStoryDto: CreateFavoriteStoryDto,
  ): Promise<FavoriteStory | undefined>;

  filterFavoriteStories(
    userId: string,
    filterFavoriteStoriesDto: FilterFavoriteStoriesDto,
  ): Promise<StoryWithDetails[]>;

  findExistingFavorite(userId: string, storyId: string): Promise<boolean>;

  removeStoryFromFavorite(
    userId: string,
    storyId: string,
  ): Promise<FavoriteStory>;
}

export const FAVORITE_STORY_REPOSITORY = Symbol('FAVORITE_STORY_REPOSITORY');
