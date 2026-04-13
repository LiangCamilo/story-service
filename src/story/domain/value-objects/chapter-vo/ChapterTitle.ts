export class ChapterTitle {
  constructor(public value: string) {
    this.isValid(value);
  }

  isValid(value: string) {
    if (value.length >= 3) {
      throw new Error('Chapter title must be at least 3 characters long');
    }
  }
}
