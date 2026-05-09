import { Id } from '../value-objects/id.vo';
import { Story } from './story.entity';

type StoryCreateParams = Parameters<typeof Story.create>[0];
export class FavoriteStory {
  constructor(
    private id: Id,
    private storyId: string,
    private userId: string,
    private createdAt?: Date,
    private updatedAt?: Date,
    private story?: Story,
  ) {}

  static create(params: {
    storyId: string;
    userId: string;
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    story?: StoryCreateParams;
  }): FavoriteStory {
    const storyInstance = params.story
      ? params.story instanceof Story
        ? params.story
        : Story.create(params.story)
      : undefined;

    return new FavoriteStory(
      new Id(params.id),
      params.storyId,
      params.userId,
      params.createdAt,
      params.updatedAt,
      storyInstance,
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

  get getStory() {
    return this.story;
  }

  toPrimitives() {
    return {
      id: this.id.getValue,
      storyId: this.storyId,
      userId: this.userId,
      createdAt: this.createdAt?.toISOString(),
      updatedAt: this.updatedAt?.toISOString(),
      story: this.story ? this.story.toPrimitives() : undefined,
    };
  }
}
