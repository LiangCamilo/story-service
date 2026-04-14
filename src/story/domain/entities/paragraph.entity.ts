import { ParagraphContent } from '../value-objects/paragraph-vo/paragraph-content.vo';
import { ParagraphOrder } from '../value-objects/paragraph-vo/paragraph-order.vo';

export class Paragraph {
  constructor(
    public id: string,
    public content: ParagraphContent,
    public order: ParagraphOrder,
    public chapterId: string,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}
}
