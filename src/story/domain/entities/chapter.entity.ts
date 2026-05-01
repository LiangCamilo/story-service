import { ChapterOrder } from '../value-objects/chapter-vo/chapter-order.vo';
import { ChapterTitle } from '../value-objects/chapter-vo/chapter-title.vo';

export class Chapter {
  constructor(
    private id: string,
    private title: ChapterTitle,
    private order: ChapterOrder,
    private storyId: string,
    private content: string,
  ) {}

  // static create(params: {
  //   title: string;
  //   order: Number;
  //   storyId: string
  //   paragraphs?:
  // })
}
