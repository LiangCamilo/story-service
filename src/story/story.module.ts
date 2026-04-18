import { Module } from '@nestjs/common';
import { CreateStoryUseCase } from './application/use-cases/story-use-cases/create-story.use-case';
import { STORY_REPOSITORY } from './application/ports/story.repository';
import { PrismaStoryRepository } from './infrastructure/adapters/prisma-story.repository';
import { PrismaTagRepository } from './infrastructure/adapters/prisma-tag.repository';
import { TAG_REPOSITORY } from './application/ports/tag.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [
    CreateStoryUseCase,
    {
      provide: STORY_REPOSITORY,
      useClass: PrismaStoryRepository,
    },
    {
      provide: TAG_REPOSITORY,
      useClass: PrismaTagRepository,
    },
  ],
})
export class StoryModule {}
