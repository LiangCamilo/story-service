export class GenreName {
  constructor(public value: string) {
    this.isValid(value);
  }

  isValid(value: string) {
    if (value.trim().length <= 1) {
      throw new Error('Genre name must be at least 1 character long');
    }
  }
}
