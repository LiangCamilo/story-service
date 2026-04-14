import { DomainValidationError } from '../../errors/DomainValidationError';

export class RatingScore {
  private value: number;

  constructor(score: number) {
    this.value = score;
    this.isValid(this.value);
  }

  get getValue(): number {
    return this.value;
  }

  set setValue(score: number) {
    this.value = score;
  }

  isValid(value: number) {
    if (value < 0 || value > 10) {
      throw new DomainValidationError(
        'La calificación debe estar entre 0 y 10',
      );
    }
  }
}
