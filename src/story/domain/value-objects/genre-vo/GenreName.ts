export class GenreName {
  constructor(public value: string) {}

  isValid(value: string) {
    if (value.length <= 1) {
      throw new Error('Genre name must be at least 1 character long');
    }
  }
}
