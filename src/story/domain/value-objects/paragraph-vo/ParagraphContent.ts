export class ParagraphContent {
  constructor(public value: string) {}

  isValid(value: string) {
    if (value.length <= 1) {
      throw new Error('Paragraph content must be at least 1 character long');
    }
  }
}
