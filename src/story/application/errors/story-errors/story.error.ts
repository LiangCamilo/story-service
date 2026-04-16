export class StoryError extends Error {
  constructor(
    private param: {
      message: string;
      type?: string;
      storyId?: string;
      title?: string;
    },
  ) {
    super(param.message);
    this.param.type = 'story-error';
  }
}
