import { ChapterOrder } from '../value-objects/chapter-vo/chapter-order.vo';
import { ChapterTitle } from '../value-objects/chapter-vo/chapter-title.vo';
import { Id } from '../value-objects/id.vo';

export class Chapter {
  constructor(
    private id: Id,
    private title: ChapterTitle,
    private order: ChapterOrder,
    private storyId: string,
    private content: string,
    private hidden?: boolean,
    private totalComments?: number,
    private createdAt?: Date,
    private updatedAt?: Date | null,
  ) {}

  static create(params: {
    title: string;
    order: number;
    storyId: string;
    content: string;
    id?: string;
    hidden?: boolean;
    totalComments?: number;
    createdAt?: Date;
    updatedAt?: Date | null;
  }) {
    return new Chapter(
      new Id(params.id),
      new ChapterTitle(params.title),
      new ChapterOrder(params.order),
      params.storyId,
      params.content,
      params.hidden ?? true,
      params.totalComments ?? 0,
      params.createdAt,
      params.updatedAt,
    );
  }

  get getId() {
    return this.id;
  }

  get getTitle() {
    return this.title;
  }

  get getStoryId() {
    return this.storyId;
  }

  get getOrder() {
    return this.order;
  }

  get getContent() {
    return this.content;
  }

  get getTotalComments() {
    return this.totalComments;
  }

  get getCreatedAt() {
    return this.createdAt;
  }

  get getUpdatedAt() {
    return this.updatedAt;
  }

  toPrimitives() {
    return {
      id: this.getId.getValue,
      title: this.getTitle.getValue,
      content: this.getContent,
      storyId: this.getStoryId,
      order: this.getOrder.getValue,
      totalComments: this.getTotalComments,
    };
  }
}
