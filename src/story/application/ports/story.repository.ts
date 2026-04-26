import { Story } from 'src/story/domain/entities/story.entity';
import { FindMultipleStoryDto } from '../dtos/story-dtos/find-multiple-story.dto';
import { FilterMultipleStoryDto } from '../dtos/story-dtos/filter-multilple-story.dto';

export interface StoryRepositoryPort {
  createStory(story: Story): Promise<Story>;
  findByTitle(title: string): Promise<Story | null>;
  findById(id: string): Promise<Story | null>;
  findAndFilterMultiple(
    findMultiple: FindMultipleStoryDto,
    filterMultiple: FilterMultipleStoryDto | undefined,
  ): Promise<Story[] | null>;
}

export const STORY_REPOSITORY = Symbol('STORY_REPOSITORY');
