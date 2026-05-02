import { Inject, Injectable } from '@nestjs/common';
import {
  STORY_REPOSITORY,
  StoryRepositoryPort,
} from '../../ports/story.repository';
import { FindMultipleStoryDto } from '../../dtos/story-dtos/find-multiple-story.dto';
import { FilterMultipleStoryDto } from '../../dtos/story-dtos/filter-multilple-story.dto';

@Injectable()
export class FindAndFilterMultipleStoryUseCase {
  constructor(
    @Inject(STORY_REPOSITORY) private storyRepository: StoryRepositoryPort,
  ) {}

  async execute(
    findDto: FindMultipleStoryDto,
    filterDto?: FilterMultipleStoryDto,
  ) {
    const pageSize: number = findDto.limit;

    const stories = await this.storyRepository.findAndFilterMultiple(
      findDto,
      filterDto,
    );

    const totalItems = stories.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const numberPage = Math.floor(findDto.offset / findDto.limit) + 1;

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

