import { ParagraphContent } from '../value-objects/paragraph-vo/paragraph-content.vo';
import { ParagraphOrder } from '../value-objects/paragraph-vo/paragraph-order.vo';

export class Paragraph {
  constructor(
    private id: string,
    private content: ParagraphContent,
    private order: ParagraphOrder,
    private chapterId: string,
    private createdAt?: Date,
    private updatedAt?: Date,
  ) {}
}
