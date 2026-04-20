import { Inject, Injectable } from '@nestjs/common';
import {
  GENRE_REPOSITORY,
  GenreRepositoryPort,
} from '../../ports/genre.repository';
import { GenreNotFoundError } from '../../errors/genre-errors/genre-not-found.error';

@Injectable()
export class FindGenreByNameUseCase {
  constructor(
    @Inject(GENRE_REPOSITORY) private genreRepository: GenreRepositoryPort,
  ) {}

  async execute(name: string) {
    const genre = await this.genreRepository.findGenreByName(name);

    if (!genre) {
      throw new GenreNotFoundError(name);
    }

    return genre.toPrimitives();
  }
}
