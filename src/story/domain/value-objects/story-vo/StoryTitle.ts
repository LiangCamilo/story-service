import { DomainValidationError } from '../../errors/DomainValidationError';

export class StoryTitle {
  constructor(public value: string) {
    this.isValid(value);
  }

  isValid(value: string) {
    if (value.trim().length < 3) {
      throw new DomainValidationError(
        'El titulo del capitulo debe poseer una longitud de 3 letras o más',
      );
    }
  }
}
