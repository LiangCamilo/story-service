import { Id } from '../value-objects/id.vo';

export class View {
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
    return new View(
      new Id(params.id),
      params.storyId,
      params.userId,
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
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
