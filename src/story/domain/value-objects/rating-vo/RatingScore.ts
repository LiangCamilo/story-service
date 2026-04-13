export class RatingScore {
  constructor(public value: number) {
    this.isValid(value);
  }

  isValid(value: number) {
    if (value < 0 || value > 10) {
      throw new Error('Rating must be greather than 0 and less than 10');
    }
  }
}
