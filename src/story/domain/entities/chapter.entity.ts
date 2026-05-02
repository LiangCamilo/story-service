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
  ) {}

  static create(params: {
    title: string;
    order: number;
    storyId: string;
    content: string;
  }) {
    return new Chapter(
      new Id(params.storyId),
      new ChapterTitle(params.title),
      new ChapterOrder(params.order),
      params.storyId,
      params.content,
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

  toPrimitives() {
    return {
      id: this.getId.getValue,
      title: this.title.getValue,
      content: this.content,
      storyId: this.storyId,
      order: this.order.getValue,
    };
  }
}
