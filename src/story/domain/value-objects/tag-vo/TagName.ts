import { DomainValidationError } from '../../errors/DomainValidationError';

export class TagName {
  constructor(public value: string) {
    this.isValid(value);
  }

  isValid(value: string) {
    if (value.trim().length < 1) {
      throw new DomainValidationError(
        'El nombre del tag debe poseer una longitud de 1 letra o más',
      );
    }
  }
}
