export class TagName {
  constructor(public value: string) {}

  isValid(value: string) {
    if (value.length <= 1) {
      throw new Error('Tag name must be at least 1 character long');
    }
  }
}
