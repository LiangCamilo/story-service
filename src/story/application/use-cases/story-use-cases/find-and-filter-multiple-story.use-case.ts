import { Inject, Injectable } from '@nestjs/common';
import {
  STORY_REPOSITORY,
  StoryRepositoryPort,
} from '../../ports/story.repository';
import { FilterMultipleStoryDto } from '../../dtos/story-dtos/filter-multilple-story.dto';

@Injectable()
export class FindAndFilterMultipleStoryUseCase {
  constructor(
    @Inject(STORY_REPOSITORY) private storyRepository: StoryRepositoryPort,
  ) {}

  async execute(filterDto: FilterMultipleStoryDto) {
    const { limit, offset } = filterDto;

    const { stories, totalItems } =
      await this.storyRepository.findAndFilterMultiple(filterDto);

    const pageSize: number = limit;
    const totalPages = Math.ceil(totalItems / pageSize);
    const numberPage = Math.floor(offset / limit) + 1;

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
