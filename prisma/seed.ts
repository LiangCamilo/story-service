// // prisma/seed.ts
// import { PrismaClient } from '../src/generated/prisma/client.js';
// // ¡Actualiza estas rutas relativas si cambias la ubicación del archivo!
// import { GenreNameConstants } from '../src/story/domain/constants/genre-constants/genre-name.constants';
// import { Genre } from '../src/story/domain/entities/genre.entity';

// // Instanciamos el cliente plano de Prisma (sin NestJS)
// const prisma = new PrismaClient();

// async function main() {
//   console.log('Iniciando seeder de géneros...');

//   const genres = GenreNameConstants.map((genre) =>
//     Genre.create({ name: genre }),
//   );
//   const genrePrimitives = genres.map((genre) => genre.toPrimitives());

//   await prisma.genre.createMany({
//     data: genrePrimitives,
//     skipDuplicates: true,
//   });

//   console.log('Géneros sembrados con éxito.');
// }

// // Ejecutamos la función y manejamos la conexión
// main()
//   .catch((e) => {
//     console.error('Error inyectando datos:', e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
