import { PrismaService } from 'src/prisma/prisma.service';
import { GenreNameConstants } from 'src/story/domain/constants/genre-constants/genre-name.constants';
import { Genre } from 'src/story/domain/entities/genre.entity';

const genreSeeder = async (prismaService: PrismaService) => {
  const genres = GenreNameConstants.map((genre) =>
    Genre.create({ name: genre }),
  );

  const genrePrimitives = genres.map((genre) => {
    return genre.toPrimitives();
  });
  await prismaService.genre.createMany({
    data: genrePrimitives,
    skipDuplicates: true,
  });
};

export default genreSeeder;
