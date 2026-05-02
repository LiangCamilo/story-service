export class ChapterError extends Error {
  constructor(
    private param: {
      message: string;
      type?: string;
      chapterId?: string;
      storyId?: string;
      title?: string;
      status?: number;
    },
  ) {
    super(param.message);
    this.param.type = 'chapter-error';
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

  get getStatus() {
    return this.param.status;
  }
}
