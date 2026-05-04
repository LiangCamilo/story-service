import { Rating } from 'src/story/domain/entities/rating.entity';

export interface RatingRepositoryPort {
  findRatingByStoryAndUserId(
    storyId: string,
    userId: string,
  ): Promise<Rating | undefined>;
  createOrUpdateRating(
    storyId: string,
    userId: string,
    score: number,
  ): Promise<Rating | undefined>;
  createRating(
    storyId: string,
    userId: string,
    score: number,
  ): Promise<Rating | undefined>;
  updateRating(
    storyId: string,
    userId: string,
    score: number,
  ): Promise<Rating | undefined>;
}

export const RATING_REPOSITORY = Symbol('RATING_REPOSITORY');
