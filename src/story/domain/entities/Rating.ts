import { RatingScore } from '../value-objects/rating-vo/RatingScore';

export class Rating {
  constructor(
    public id: string,
    public storyId: string,
    public userId: string,
    public score: RatingScore,
  ) {}
}
