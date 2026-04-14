import { DomainValidationError } from '../../errors/DomainValidationError';

export class ParagraphOrder {
  constructor(public value: number) {
    this.isValid(value);
  }

  isValid(value: number) {
    if (value < 1) {
      throw new DomainValidationError(
        'El orden del parrafo debe ser mayor o igual a 1',
      );
    }
  }
}
