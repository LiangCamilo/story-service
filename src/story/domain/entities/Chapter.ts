import { ChapterOrder } from '../value-objects/chapter-vo/ChapterOrder';
import { ChapterTitle } from '../value-objects/chapter-vo/ChapterTitle';
import { Paragraph } from './Paragraph';

export class Chapter {
  constructor(
    public id: string,
    public title: ChapterTitle,
    public order: ChapterOrder,
    public storyId: string,
    public paragraphs: Paragraph[] = [],
  ) {}
}
