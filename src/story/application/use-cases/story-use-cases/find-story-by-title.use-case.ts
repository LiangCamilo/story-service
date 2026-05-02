import { Inject, Injectable } from '@nestjs/common';
import {
  STORY_REPOSITORY,
  StoryRepositoryPort,
} from '../../ports/story.repository';
import { StoryNotFoundError } from '../../errors/story-errors/story-not-found.error';

@Injectable()
export class FindStoryByTitleUseCase {
  constructor(
    @Inject(STORY_REPOSITORY) private storyRepository: StoryRepositoryPort,
  ) {}

  async execute(title: string) {
    const story = await this.storyRepository.findByTitle(title);

    if (!story) {
      throw new StoryNotFoundError(404, title);
    }

    return story;
  }
}
