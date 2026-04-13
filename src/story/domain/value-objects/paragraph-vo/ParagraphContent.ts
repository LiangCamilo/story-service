import { DomainValidationError } from '../../errors/DomainValidationError';

export class ParagraphContent {
  constructor(public value: string) {
    this.isValid(value);
  }

  isValid(value: string) {
    if (value.trim().length < 1) {
      throw new DomainValidationError(
        'El contenido del parrafo debe poseer una longitud de 1 letra o más ',
      );
    }
  }
}
