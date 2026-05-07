import { Story } from 'src/story/domain/entities/story.entity';
import { FindMultipleStoryDto } from '../dtos/story-dtos/find-multiple-story.dto';
import { FilterMultipleStoryDto } from '../dtos/story-dtos/filter-multilple-story.dto';
import { StoryWithDetails } from '../read-models/story-with-details.read-model';
import { FilterMyStoriesDto } from '../dtos/story-dtos/filter-my-stories.dto';

export interface UpdateStoryData {
  title?: string;
  description?: string;
  genreId?: string;
  secondaryGenreId?: string | null;
  status?: string;
  coverUrl?: string;
}

export interface StoryRepositoryPort {
  createStory(story: Story): Promise<Story>;
  findByTitle(title: string): Promise<StoryWithDetails | undefined>;
  findById(id: string): Promise<StoryWithDetails | undefined>;
  findAndFilterMultiple(
    findMultiple: FindMultipleStoryDto,
    filterMultiple: FilterMultipleStoryDto | undefined,
  ): Promise<StoryWithDetails[]>;
  findAndFilterMyStories(
    findMultiple: FindMultipleStoryDto,
    filterMultiple: FilterMyStoriesDto,
  ): Promise<StoryWithDetails[]>;
  deleteStoryById(id: string): Promise<void>;
  updateStory(id: string, data: UpdateStoryData): Promise<StoryWithDetails>;
  toggleHidden(id: string): Promise<Story | undefined>;
}

export const STORY_REPOSITORY = Symbol('STORY_REPOSITORY');
