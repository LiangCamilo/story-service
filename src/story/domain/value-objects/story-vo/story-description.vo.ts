import { DomainValidationError } from '../../errors/DomainValidationError';

export class StoryDescription {
  private value: string;

  constructor(description: string) {
    this.value = description;
    this.isValid(this.value);
  }

  get getValue(): string {
    return this.value;
  }

  set setValue(description: string) {
    this.value = description;
  }

  isValid(value: string) {
    if (value.trim().length < 1) {
      throw new DomainValidationError(
        'La descripción de la historia debe poseer una longitud de 1 letra o más',
      );
    }
  }
}
