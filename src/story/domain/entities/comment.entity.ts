import { Id } from '../value-objects/id.vo';

export class Comment {
  constructor(
    private id: Id,
    private userId: string,
    private username: string,
    private content: string,
    private likes: number,
    private storyId?: string,
    private chapterId?: string,
    private createdAt?: Date,
    private updatedAt?: Date,
  ) {}

  static create(params: {
    id?: string;
    userId: string;
    username: string;
    content: string;
    likes?: number;
    storyId?: string;
    chapterId?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): Comment {
    return new Comment(
      new Id(params.id),
      params.userId,
      params.username,
      params.content,
      params.likes ?? 0,
      params.storyId,
      params.chapterId,
      params.createdAt,
      params.updatedAt,
    );
  }

  get getId(): Id {
    return this.id;
  }

  get getUserId(): string {
    return this.userId;
  }

  get getContent(): string {
    return this.content;
  }

  get getLikes(): number {
    return this.likes;
  }

  get getStoryId(): string | undefined {
    return this.storyId;
  }

  get getChapterId(): string | undefined {
    return this.chapterId;
  }

  get getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  get getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  get getUsername(): string {
    return this.username;
  }

  toPrimitives() {
    return {
      id: this.id.getValue,
      userId: this.userId,
      username: this.username,
      content: this.content,
      likes: this.likes,
      storyId: this.storyId ?? null,
      chapterId: this.chapterId ?? null,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
