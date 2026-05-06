import { Inject, Injectable } from '@nestjs/common';
import {
  STORY_REPOSITORY,
  StoryRepositoryPort,
} from '../../ports/story.repository';
import { StoryNotFoundError } from '../../errors/story-errors/story-not-found.error';

@Injectable()
export class ToggleHiddenStoryUseCase {
  constructor(
    @Inject(STORY_REPOSITORY) private storyRepository: StoryRepositoryPort,
  ) { }

  async execute(id: string) {
    const toggledPublication = await this.storyRepository.toggleHidden(id);

    if (!toggledPublication) {
      throw new StoryNotFoundError(404, undefined, id);
    }

    return toggledPublication;
  }
}
