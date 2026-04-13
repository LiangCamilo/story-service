export class ParagraphContent {
  constructor(public value: string) {
    this.isValid(value);
  }

  isValid(value: string) {
    if (value.trim().length <= 1) {
      throw new Error('Paragraph content must be at least 1 character long');
    }
  }
}
