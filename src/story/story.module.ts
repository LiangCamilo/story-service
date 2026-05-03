import { Module } from '@nestjs/common';
import { CreateStoryUseCase } from './application/use-cases/story-use-cases/create-story.use-case';
import { UpdateStoryUseCase } from './application/use-cases/story-use-cases/update-story.use-case';
import { STORY_REPOSITORY } from './application/ports/story.repository';
import { PrismaStoryRepository } from './infrastructure/adapters/prisma-story.repository';
import { PrismaTagRepository } from './infrastructure/adapters/prisma-tag.repository';
import { TAG_REPOSITORY } from './application/ports/tag.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StoryController } from './presentation/controllers/story.controller';
import { PrismaGenreRepository } from './infrastructure/adapters/prisma-genre.repository';
import { GENRE_REPOSITORY } from './application/ports/genre.repository';
import { FindGenresUseCase } from './application/use-cases/genre-use-cases/find-genres.use-case';
import { GenreController } from './presentation/controllers/genre.controller';
import { FindGenreByNameUseCase } from './application/use-cases/genre-use-cases/find-genre-by-name.use-case';
import { FindGenreByIdUseCase } from './application/use-cases/genre-use-cases/find-genre-by-id.use-case ';
import { FindStoryByIdUseCase } from './application/use-cases/story-use-cases/find-story-by-id.use-case';
import { FindStoryByTitleUseCase } from './application/use-cases/story-use-cases/find-story-by-title.use-case';
import { FindAndFilterMultipleStoryUseCase } from './application/use-cases/story-use-cases/find-and-filter-multiple-story.use-case';
import { DeleteStoryByIdUseCase } from './application/use-cases/story-use-cases/delete-story-by-id.use-case';
import { ChapterController } from './presentation/controllers/chapter.controller';
import { CHAPTER_REPOSITORY } from './application/ports/chapter.repository';
import { PrismaChapterRepository } from './infrastructure/adapters/prisma-chapter.repository';
import { CreateChapterUseCase } from './application/use-cases/chapter-use-cases/create-chapter.use-case';
import { FindAllChaptersByStoryIdUseCase } from './application/use-cases/chapter-use-cases/find-all-chapters-by-story-id.use-case';
import { DeleteChapterByIdUseCase } from './application/use-cases/chapter-use-cases/delete-chapter-by-id.use-case';
import { UpdateChapterUseCase } from './application/use-cases/chapter-use-cases/update-chapter.use-case';
import { CloudinaryModule } from 'src/utils/cloudinary/cloudinary.module';
import { VIEW_REPOSITORY } from './application/ports/view.repository';
import { PrismaViewRepository } from './infrastructure/adapters/prisma-view.repository';
import { ViewController } from './presentation/controllers/view.controller';
import { CreateViewUseCase } from './application/use-cases/view-use-cases/create-view.use-case';
import { RatingController } from './presentation/controllers/rating.controller';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [
    StoryController,
    GenreController,
    ChapterController,
    ViewController,
    RatingController,
  ],
  providers: [
    CreateStoryUseCase,
    FindGenresUseCase,
    FindGenreByNameUseCase,
    FindGenreByIdUseCase,
    FindStoryByTitleUseCase,
    FindStoryByIdUseCase,
    FindAndFilterMultipleStoryUseCase,
    DeleteStoryByIdUseCase,
    UpdateStoryUseCase,
    CreateChapterUseCase,
    FindAllChaptersByStoryIdUseCase,
    DeleteChapterByIdUseCase,
    UpdateChapterUseCase,
    CreateViewUseCase,
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
    {
      provide: CHAPTER_REPOSITORY,
      useClass: PrismaChapterRepository,
    },
    {
      provide: VIEW_REPOSITORY,
      useClass: PrismaViewRepository,
    },
  ],
})
export class StoryModule {}
