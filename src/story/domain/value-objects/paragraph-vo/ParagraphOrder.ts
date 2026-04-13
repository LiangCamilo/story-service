export class ParagraphOrder {
  constructor(public value: number) {
    this.isValid(value);
  }

  isValid(value: number) {
    if (value < 1) {
      throw new Error('Paragraph order must be equal or greater than 1');
    }
  }
}
