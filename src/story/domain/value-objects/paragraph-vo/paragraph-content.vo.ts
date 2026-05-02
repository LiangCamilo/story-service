import { DomainValidationError } from '../../errors/DomainValidationError';

export class ParagraphContent {
  private value: string;

  constructor(content: string) {
    this.value = content;
    this.isValid(this.value);
  }

  get getValue(): string {
    return this.value;
  }

  set setValue(content: string) {
    this.value = content;
  }

  isValid(value: string) {
    if (value.trim().length < 1) {
      throw new DomainValidationError(
        'El contenido del parrafo debe poseer una longitud de 1 letra o más ',
      );
    }
  }
}
