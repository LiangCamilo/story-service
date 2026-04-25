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
    filterDto: FilterMultipleStoryDto,
  ) {}
}
