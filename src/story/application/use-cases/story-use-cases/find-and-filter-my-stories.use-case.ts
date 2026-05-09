import { Inject, Injectable } from '@nestjs/common';
import {
  STORY_REPOSITORY,
  StoryRepositoryPort,
} from '../../ports/story.repository';
import { FilterMyStoriesDto } from '../../dtos/story-dtos/filter-my-stories.dto';

@Injectable()
export class FindAndFilterMyStoriesUseCase {
  constructor(
    @Inject(STORY_REPOSITORY) private storyRepository: StoryRepositoryPort,
  ) {}

  async execute(userId: string, dto: FilterMyStoriesDto) {
    const stories = await this.storyRepository.findAndFilterMyStories(
      userId,
      dto,
    );

    const pageSize: number = dto.limit;
    const totalItems = stories.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const numberPage = Math.floor(dto.offset / dto.limit) + 1;

    return {
      stories,
      meta: {
        totalItems,
        pageSize,
        totalPages,
        numberPage,
      },
    };
  }
}
