import { GenreError } from './genre-error';

export class GenreNotFoundError extends GenreError {
  constructor(name: string, genreId?: string) {
    super({
      message: `El genero solicitado no fue encontrado`,
      genreId,
      name,
    });
  }
}
