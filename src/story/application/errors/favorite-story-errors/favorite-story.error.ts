export class FavoriteStoryError extends Error {
  constructor(
    private param: {
      message: string;
      type?: string;
      userId?: string;
      storyId?: string;
      title?: string;
      status?: number;
    },
  ) {
    super(param.message);
    this.param.type = 'favorite-story-error';
    this.param.status = param.status ?? 400;
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

  get getTitle() {
    return this.param.title;
  }

  get getUserId() {
    return this.param.userId;
  }

  get getStatus() {
    return this.param.status;
  }
}
