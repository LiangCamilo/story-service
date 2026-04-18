import { DomainValidationError } from '../../errors/DomainValidationError';

export class StoryTotalRating {
  private value: number;

  constructor(public totalRating: number = 0) {
    this.value = Number(totalRating);
    this.isValid(this.value);
  }

  get getValue(): number {
    return this.value;
  }

  set setValue(totalRating: number) {
    this.value = totalRating;
  }

  isValid(value: number) {
    if (value < 0 || value > 10) {
      throw new DomainValidationError(
        'La puntuación total debe estar entre 0 y 10',
      );
    }
  }
}
