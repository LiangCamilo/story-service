import { Inject, Injectable } from '@nestjs/common';
import {
  GENRE_REPOSITORY,
  GenreRepositoryPort,
} from '../../ports/genre.repository';

@Injectable()
export class FindGenresUseCase {
  constructor(
    @Inject(GENRE_REPOSITORY) private genreRepository: GenreRepositoryPort,
  ) {}

  async execute() {
    const genres = await this.genreRepository.findAllGenres();

    return genres.map((genre) => {
      return {
        id: genre.getId.getValue,
        name: genre.getName.getValue,
      };
    });
  }
}
