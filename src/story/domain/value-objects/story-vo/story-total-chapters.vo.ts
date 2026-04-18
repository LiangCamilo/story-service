import { DomainValidationError } from '../../errors/DomainValidationError';

export class StoryTotalChapters {
  private value: number;

  constructor(public totalChapters: number = 0) {
    this.value = Number(totalChapters);
    this.isValid(this.value);
  }

  get getValue(): number {
    return this.value;
  }

  set setValue(totalChapters: number) {
    this.value = totalChapters;
  }

  isValid(value: number) {
    if (value < 0) {
      throw new DomainValidationError(
        'La historia no puede tener menos de 0 capitulos... por obvias razones',
      );
    }
  }
}
