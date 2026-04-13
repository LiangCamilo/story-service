export class TagName {
  constructor(public value: string) {
    this.isValid(value);
  }

  isValid(value: string) {
    if (value.trim().length <= 1) {
      throw new Error('Tag name must be at least 1 character long');
    }
  }
}
