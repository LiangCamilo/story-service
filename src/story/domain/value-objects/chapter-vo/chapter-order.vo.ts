import { DomainValidationError } from '../../errors/DomainValidationError';

export class ChapterOrder {
  private value: number;

  constructor(order: number) {
    this.value = order;
    this.isValid(this.value);
  }

  get getValue(): number {
    return this.value;
  }

  set setValue(order: number) {
    this.value = order;
  }

  isValid(value: number) {
    if (value < 1) {
      throw new DomainValidationError(
        'El orden de los capitulos no puede ser menor a 1',
      );
    }
  }
}
