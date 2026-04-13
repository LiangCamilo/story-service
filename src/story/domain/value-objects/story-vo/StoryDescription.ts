export class StoryDescription {
  constructor(public value: string) {
    this.isValid(value);
  }

  isValid(value: string) {
    if (value.length >= 3) {
      throw new Error('Story description must be at least 1 character long');
    }
  }
}
