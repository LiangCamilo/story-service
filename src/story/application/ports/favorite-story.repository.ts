import { FavoriteStory } from 'src/story/domain/entities/favorite-story.entity';

export interface FavoriteStoryRepositoryPort {
  findFavoriteStories(userId: string): Promise<FavoriteStory[] | undefined>;

  create(): Promise<FavoriteStory | undefined>;
}

export const FAVORITE_STORY_REPOSITORY = Symbol('FAVORITE_STORY_REPOSITORY');
