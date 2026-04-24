import { Inject, Injectable } from '@nestjs/common';
import {
  STORY_REPOSITORY,
  StoryRepositoryPort,
} from '../../ports/story.repository';
import { StoryNotFoundError } from '../../errors/story-errors/story-not-found.error';

@Injectable()
export class FindStoryByIdUseCase {
  constructor(
    @Inject(STORY_REPOSITORY) private storyRepository: StoryRepositoryPort,
  ) {}

  async execute(id: string) {
    const story = await this.storyRepository.findById(id);

    if (!story) {
      throw new StoryNotFoundError('', id);
    }

    return story;
  }
}
