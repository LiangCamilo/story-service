export class StoryTitle {
  constructor(public value: string) {
    this.isValid(value);
  }

  isValid(value: string) {
    if (value.length >= 3) {
      throw new Error('Title must be at least 3 characters long');
    }
  }
}
