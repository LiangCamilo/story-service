import { DomainValidationError } from '../../errors/DomainValidationError';

export class ParagraphOrder {
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
        'El orden del parrafo debe ser mayor o igual a 1',
      );
    }
  }
}
