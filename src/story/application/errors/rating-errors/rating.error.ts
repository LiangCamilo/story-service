export class RatingError extends Error {
  constructor(
    private param: {
      message: string;
      score?: number;
      type?: string;
      ratingId?: string;
      storyId?: string;
      userId?: string;
      status?: number;
    },
  ) {
    super(param.message);
    this.param.type = 'rating-error';
    this.param.status = param.status ?? 500;
  }

  get getType() {
    return this.param.type;
  }

  get getMessage() {
    return this.param.message;
  }

  get getStoryId() {
    return this.param.storyId;
  }

  get getRatingId() {
    return this.param.ratingId;
  }

  get getScore() {
    return this.param.score;
  }

  get getUserId() {
    return this.param.userId;
  }

  get getStatus() {
    return this.param.status;
  }
}
