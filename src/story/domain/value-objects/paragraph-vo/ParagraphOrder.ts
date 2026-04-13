export class ParagraphOrder {
  constructor(public value: number) {}

  isValid(value: number) {
    if (value < 1) {
      throw new Error('Paragraph order must be equal or greater than 1');
    }
  }
}
