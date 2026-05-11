export class CommentError extends Error {
  constructor(
    private param: {
      message: string;
      likes?: number;
      type?: string;
      commentId?: string;
      chapterId?: string;
      storyId?: string;
      userId?: string;
      status?: number;
    },
  ) {
    super(param.message);
    this.param.type = 'comment-error';
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

  get getChapterId() {
    return this.param.chapterId;
  }

  get getLikes() {
    return this.param.likes;
  }

  get getUserId() {
    return this.param.userId;
  }

  get getStatus() {
    return this.param.status;
  }

  get getCommentId() {
    return this.param.commentId;
  }
}
