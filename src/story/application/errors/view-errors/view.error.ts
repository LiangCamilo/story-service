export class ViewError extends Error {
  constructor(
    private param: {
      message: string;
      type?: string;
      viewId?: string;
      storyId?: string;
      userId?: string;
      status?: number;
    },
  ) {
    super(param.message);
    this.param.type = 'view-error';
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

  get getViewId() {
    return this.param.viewId;
  }

  get getUserId() {
    return this.param.userId;
  }

  get getStatus() {
    return this.param.status;
  }
}
