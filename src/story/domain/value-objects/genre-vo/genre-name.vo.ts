import { DomainValidationError } from '../../errors/DomainValidationError';

export class GenreName {
  private value: string;

  constructor(name: string) {
    this.value = name;
    this.isValid(this.value);
  }

  get getValue(): string {
    return this.value;
  }

  set setValue(name: string) {
    this.value = name;
  }

  isValid(value: string) {
    if (value.trim().length < 1) {
      throw new DomainValidationError(
        'El nombre del genero debe poseer una longitud de 1 letra o más',
      );
    }
  }
}
