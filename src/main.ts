import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { PrismaService } from './prisma/prisma.service.js';
import genreSeeder from './seeder/genre.seeder.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await genreSeeder(prismaService);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
