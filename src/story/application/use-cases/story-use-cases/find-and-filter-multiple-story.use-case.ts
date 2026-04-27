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
    console.log(findDto);
    console.log(filterDto);

    let numberPage: number = 0;
    const pageSize: number = findDto.limit;
    let totalItems: number = 0;
    let totalPages: number = 0;

    const stories =
      (await this.storyRepository.findAndFilterMultiple(findDto, filterDto)) ??
      [];

    totalItems = stories?.length;
    totalPages = Math.ceil(totalItems / pageSize);
    numberPage = Math.floor(findDto.offset / findDto.limit) + 1;

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
