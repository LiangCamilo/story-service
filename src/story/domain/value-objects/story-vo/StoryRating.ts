export class StoryRating {
  constructor(public value: number) {}

  isValid(value: number) {
    if (value < 1 || value > 10) {
      throw new Error(
        'Story rating must be equal or greater than 1 and must be equal or less than 10',
      );
    }
  }
}
