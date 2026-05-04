import { Id } from '../value-objects/id.vo';
import { RatingScore } from '../value-objects/rating-vo/rating-score.vo';

export class Rating {
  constructor(
    private id: Id,
    private storyId: string,
    private userId: string,
    private score: RatingScore,
    private createdAt?: Date,
    private updatedAt?: Date,
  ) {}

  static create(params: {
    storyId: string;
    userId: string;
    score: number;
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return new Rating(
      new Id(params.id),
      params.storyId,
      params.userId,
      new RatingScore(params.score),
      params.createdAt,
      params.updatedAt,
    );
  }

  get getId() {
    return this.id;
  }

  get getStoryId() {
    return this.storyId;
  }

  get getUserId() {
    return this.userId;
  }

  get getScore() {
    return this.score;
  }

  get getCreatedAt() {
    return this.createdAt;
  }

  get getUpdatedAt() {
    return this.updatedAt;
  }

  toPrimitives() {
    return {
      id: this.id.getValue,
      storyId: this.storyId,
      userId: this.userId,
      score: this.score.getValue,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
