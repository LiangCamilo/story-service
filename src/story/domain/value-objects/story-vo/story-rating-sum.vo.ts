import { DomainValidationError } from '../../errors/DomainValidationError';

export class StoryRatingSum {
  private value: number;

  constructor(public ratingSum: number = 0) {
    this.value = Number(ratingSum);
    this.isValid(this.value);
  }

  get getValue(): number {
    return this.value;
  }

  set setValue(ratingSum: number) {
    this.value = ratingSum;
  }

  isValid(value: number) {
    if (value < 0) {
      throw new DomainValidationError(
        'La suma de las puntuaciones no puede ser menor a 0',
      );
    }
  }
}
