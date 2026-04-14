import { DomainValidationError } from '../../errors/DomainValidationError';

export class RatingScore {
  constructor(public value: number) {
    this.isValid(value);
  }

  isValid(value: number) {
    if (value < 0 || value > 10) {
      throw new DomainValidationError(
        'La calificación debe estar entre 0 y 10',
      );
    }
  }
}
