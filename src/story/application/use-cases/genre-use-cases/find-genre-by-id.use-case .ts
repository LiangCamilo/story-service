import { Inject, Injectable } from '@nestjs/common';
import {
  GENRE_REPOSITORY,
  GenreRepositoryPort,
} from '../../ports/genre.repository';
import { GenreNotFoundError } from '../../errors/genre-errors/genre-not-found.error';

@Injectable()
export class FindGenreByIdUseCase {
  constructor(
    @Inject(GENRE_REPOSITORY) private genreRepository: GenreRepositoryPort,
  ) {}

  async execute(id: string) {
    const genre = await this.genreRepository.findGenreById(id);

    if (!genre) {
      throw new GenreNotFoundError(id);
    }

    return genre.toPrimitives();
  }
}
