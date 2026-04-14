import { DomainValidationError } from '../../errors/DomainValidationError';

export class ChapterTitle {
  private value: string;

  constructor(title: string) {
    this.value = title;
    this.isValid(this.value);
  }

  get getValue(): string {
    return this.value;
  }

  set setValue(title: string) {
    this.value = title;
  }

  isValid(value: string) {
    if (value.trim().length < 3) {
      throw new DomainValidationError(
        'El titulo del capitulo debe poseer una longitud de 3 letras o más',
      );
    }
  }
}
