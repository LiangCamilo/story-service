import {
  AllowedGenre,
  GenreNameConstants,
} from '../../constants/genre-constants/genre-name.constants';
import { DomainValidationError } from '../../errors/DomainValidationError';
export class GenreName {
  private value: AllowedGenre;

  constructor(name: AllowedGenre) {
    this.value = name;
    this.validate(this.value);
  }

  private validate(value: string): void {
    if (!(GenreNameConstants as readonly string[]).includes(value)) {
      throw new DomainValidationError(
        `El género '${value}' no existe en el sistema. Los permitidos son: ${GenreNameConstants.join(', ')}`,
      );
    }
  }

  get getValue(): AllowedGenre {
    return this.value;
  }
}
