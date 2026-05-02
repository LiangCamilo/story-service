import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GenreRepositoryPort } from 'src/story/application/ports/genre.repository';
import { AllowedGenre } from 'src/story/domain/constants/genre-constants/genre-name.constants';
import { Genre } from 'src/story/domain/entities/genre.entity';

@Injectable()
export class PrismaGenreRepository implements GenreRepositoryPort {
  constructor(private prisma: PrismaService) {}

  async findGenreById(id: string): Promise<Genre | undefined> {
    const genre =
      (await this.prisma.genre.findUnique({
        where: { id },
      })) ?? undefined;

    if (!genre) {
      return undefined;
    }

    return Genre.create({
      id: genre.id,
      name: genre.name as AllowedGenre,
    });
  }

  async findGenreByName(name: string): Promise<Genre | undefined> {
    const genre =
      (await this.prisma.genre.findUnique({
        where: { name },
      })) ?? undefined;

    if (!genre) {
      return undefined;
    }

    return Genre.create({
      id: genre.id,
      name: genre.name as AllowedGenre,
    });
  }

  async findAllGenres(): Promise<Genre[]> {
    const genres = await this.prisma.genre.findMany({});

    return genres.map((genre) => {
      return Genre.create({
        id: genre.id,
        name: genre.name as AllowedGenre,
      });
    });
  }
}
