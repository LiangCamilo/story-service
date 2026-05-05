import { DomainValidationError } from '../../errors/DomainValidationError';

export class StoryRatingCount {
  private value: number;

  constructor(public ratingCount: number = 0) {
    this.value = Number(ratingCount);
    this.isValid(this.value);
  }

  get getValue(): number {
    return this.value;
  }

  set setValue(ratingCount: number) {
    this.value = ratingCount;
  }

  isValid(value: number) {
    if (value < 0) {
      throw new DomainValidationError(
        'La cantidad de gente que ha votado no puede ser menor a 0',
      );
    }
  }
}
