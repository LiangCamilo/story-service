export class ChapterOrder {
  constructor(public value: number) {}

  isValid(value: number) {
    if (value < 1) {
      throw new Error('Chapter order must be equal or greater than 1');
    }
  }
}
