import { DomainValidationError } from '../../errors/DomainValidationError';

export class ChapterOrder {
  constructor(public value: number) {
    this.isValid(value);
  }

  isValid(value: number) {
    if (value < 1) {
      throw new DomainValidationError(
        'El orden de los capitulos no puede ser menor a 0',
      );
    }
  }
}
