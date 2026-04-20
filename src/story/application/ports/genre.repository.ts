import { Genre } from 'src/story/domain/entities/genre.entity';

export interface GenreRepositoryPort {
  findGenreByName(name: string): Promise<Genre | undefined>;
  findGenreById(id: string): Promise<Genre | undefined>;
  findAllGenres(): Promise<Genre[]>;
}

export const GENRE_REPOSITORY = Symbol('GENRE_REPOSITORY');
