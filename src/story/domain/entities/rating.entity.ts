import { RatingScore } from '../value-objects/rating-vo/rating-score.vo';

export class Rating {
  constructor(
    private id: string,
    private storyId: string,
    private userId: string,
    private score: RatingScore,
  ) {}
}
