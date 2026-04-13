import { ParagraphContent } from '../value-objects/paragraph-vo/ParagraphContent';
import { ParagraphOrder } from '../value-objects/paragraph-vo/ParagraphOrder';

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
