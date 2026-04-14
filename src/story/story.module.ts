import { Module } from '@nestjs/common';
import { CreateStoryUseCase } from './application/use-cases/story-use-cases/create-story.use-case';
import { STORY_REPOSITORY } from './application/ports/story.repository';
import { PrismaStoryRepository } from './infrastructure/adapters/prisma-story.repository';

@Module({
  imports: [],
  providers: [
    CreateStoryUseCase,
    {
      provide: STORY_REPOSITORY,
      useClass: PrismaStoryRepository,
    },
  ],
})
export class StoryModule {}
