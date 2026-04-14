import { ChapterOrder } from '../value-objects/chapter-vo/chapter-order.vo';
import { ChapterTitle } from '../value-objects/chapter-vo/chapter-title.vo';
import { Paragraph } from './paragraph.entity';

export class Chapter {
  constructor(
    public id: string,
    public title: ChapterTitle,
    public order: ChapterOrder,
    public storyId: string,
    public paragraphs: Paragraph[] = [],
  ) {}
}
