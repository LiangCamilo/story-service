import { Id } from '../value-objects/id.vo';

export class StoryFavorite {
  constructor(
    private id: Id,
    private storyId: string,
    private userId: string,
    private createdAt?: Date,
    private updatedAt?: Date,
  ) {}

  static create(params: {
    storyId: string;
    userId: string;
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    return new StoryFavorite(
      new Id(params.id),
      params.storyId,
      params.userId,
      params.createdAt,
      params.updatedAt,
    );
  }

  get getId(): Id {
    return this.id;
  }

  get getStoryId(): string {
    return this.storyId;
  }

  get getUserId(): string {
    return this.userId;
  }

  get getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  get getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  toPrimitives() {
    return {
      id: this.id.getValue,
      storyId: this.storyId,
      userId: this.userId,
      createdAt: this.createdAt?.toISOString(),
      updatedAt: this.updatedAt?.toISOString(),
    };
  }
}
