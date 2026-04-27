import { GenreError } from './genre-error';

export class GenreNotFoundError extends GenreError {
  constructor(name: string, status: number, genreId?: string) {
    super({
      message: `El genero ${name} solicitado no fue encontrado`,
      genreId,
      name,
      status,
    });
  }
}
