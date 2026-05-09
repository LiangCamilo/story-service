import { Inject, Injectable } from '@nestjs/common';
import {
  STORY_REPOSITORY,
  StoryRepositoryPort,
} from '../../ports/story.repository';
import { StoriesNotFoundError } from '../../errors/story-errors/stories-not-found.error';

@Injectable()
export class FindLastModifiedStoryByUserIdUseCase {
  constructor(
    @Inject(STORY_REPOSITORY) private storyRepository: StoryRepositoryPort,
  ) {}

  async execute(userId: string) {
    const lastModifiedStory =
      await this.storyRepository.findLastModifiedStoryByUserId(userId);

    if (!lastModifiedStory) {
      throw new StoriesNotFoundError(404);
    }

    return lastModifiedStory;
  }
}
