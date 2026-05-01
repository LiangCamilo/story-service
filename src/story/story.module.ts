import { Module } from '@nestjs/common';
import { CreateStoryUseCase } from './application/use-cases/story-use-cases/create-story.use-case';
import { STORY_REPOSITORY } from './application/ports/story.repository';
import { PrismaStoryRepository } from './infrastructure/adapters/prisma-story.repository';
import { PrismaTagRepository } from './infrastructure/adapters/prisma-tag.repository';
import { TAG_REPOSITORY } from './application/ports/tag.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StoryController } from './presentation/story.controller';
import { PrismaGenreRepository } from './infrastructure/adapters/prisma-genre.repository';
import { GENRE_REPOSITORY } from './application/ports/genre.repository';
import { FindGenresUseCase } from './application/use-cases/genre-use-cases/find-genres.use-case';
import { GenreController } from './presentation/genre.controller';
import { FindGenreByNameUseCase } from './application/use-cases/genre-use-cases/find-genre-by-name.use-case';
import { FindGenreByIdUseCase } from './application/use-cases/genre-use-cases/find-genre-by-id.use-case ';
import { FindStoryByIdUseCase } from './application/use-cases/story-use-cases/find-story-by-id.use-case';
import { FindStoryByTitleUseCase } from './application/use-cases/story-use-cases/find-story-by-title.use-case';
import { FindAndFilterMultipleStoryUseCase } from './application/use-cases/story-use-cases/find-and-filter-multiple-story.use-case';
import { DeleteStoryByIdUseCase } from './application/use-cases/story-use-cases/delete-story-by-id.use-case';

@Module({
  imports: [PrismaModule],
  controllers: [StoryController, GenreController],
  providers: [
    CreateStoryUseCase,
    FindGenresUseCase,
    FindGenreByNameUseCase,
    FindGenreByIdUseCase,
    FindStoryByTitleUseCase,
    FindStoryByIdUseCase,
    FindAndFilterMultipleStoryUseCase,
    DeleteStoryByIdUseCase,
    {
      provide: STORY_REPOSITORY,
      useClass: PrismaStoryRepository,
    },
    {
      provide: TAG_REPOSITORY,
      useClass: PrismaTagRepository,
    },
    {
      provide: GENRE_REPOSITORY,
      useClass: PrismaGenreRepository,
    },
  ],
})
export class StoryModule {}
