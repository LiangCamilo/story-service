import { Inject, Injectable } from '@nestjs/common';
import {
  VIEW_REPOSITORY,
  ViewRepositoryPort,
} from '../../ports/view.repository';
import { StoryNotFoundViewError } from '../../errors/view-errors/not-found-story-view.error';

@Injectable()
export class CreateViewUseCase {
  constructor(
    @Inject(VIEW_REPOSITORY) private viewRepository: ViewRepositoryPort,
  ) {}

  async execute(storyId: string, userId: string) {
    const existsView = await this.viewRepository.findViewByStoryAndUserId(
      storyId,
      userId,
    );

    if (existsView) {
      throw new StoryNotFoundViewError(404, undefined, userId, storyId);
    }

    const newView = await this.viewRepository.createView(storyId, userId);

    return newView;
  }
}
