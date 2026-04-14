import { DomainValidationError } from '../../errors/DomainValidationError';

export class StoryDescription {
  constructor(public value: string) {
    this.isValid(value);
  }

  isValid(value: string) {
    if (value.trim().length < 1) {
      throw new DomainValidationError(
        'La descripción de la historia debe poseer una longitud de 1 letra o más',
      );
    }
  }
}
