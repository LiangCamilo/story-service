import { Story } from 'src/story/domain/entities/story.entity';
import { FindMultipleStoryDto } from '../dtos/story-dtos/find-multiple-story.dto';
import { FilterMultipleStoryDto } from '../dtos/story-dtos/filter-multilple-story.dto';
import { StoryWithDetails } from '../read-models/story-with-details.read-model';

export interface StoryRepositoryPort {
  createStory(story: Story): Promise<Story>;
  findByTitle(title: string): Promise<StoryWithDetails | null>;
  findById(id: string): Promise<StoryWithDetails | null>;
  findAndFilterMultiple(
    findMultiple: FindMultipleStoryDto,
    filterMultiple: FilterMultipleStoryDto | undefined,
  ): Promise<StoryWithDetails[]>;
  deleteStoryById(id: string): Promise<void>;
}

export const STORY_REPOSITORY = Symbol('STORY_REPOSITORY');
