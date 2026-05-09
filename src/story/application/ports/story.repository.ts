import { Story } from 'src/story/domain/entities/story.entity';
import { FilterMultipleStoryDto } from '../dtos/story-dtos/filter-multilple-story.dto';
import { StoryWithDetails } from '../read-models/story-with-details.read-model';
import { FilterMyStoriesDto } from '../dtos/story-dtos/filter-my-stories.dto';

export interface UpdateStoryData {
  title?: string;
  description?: string;
  genreId?: string;
  secondaryGenreId?: string | null;
  status?: string;
}

export interface StoryRepositoryPort {
  createStory(story: Story): Promise<Story>;
  findByTitle(title: string): Promise<StoryWithDetails | undefined>;
  findById(id: string): Promise<StoryWithDetails | undefined>;
  findAndFilterMultiple(
    filterMultiple: FilterMultipleStoryDto,
  ): Promise<StoryWithDetails[]>;
  findAndFilterMyStories(
    userId: string,
    filterMultiple: FilterMyStoriesDto,
  ): Promise<StoryWithDetails[]>;
  deleteStoryById(id: string): Promise<void>;
  updateStory(id: string, data: UpdateStoryData): Promise<StoryWithDetails>;
  updateCoverUrl(id: string, coverUrl: string): Promise<StoryWithDetails>;
  toggleHidden(id: string): Promise<Story | undefined>;
  findLastModifiedStoryByUserId(
    userId: string,
  ): Promise<StoryWithDetails | undefined>;
}

export const STORY_REPOSITORY = Symbol('STORY_REPOSITORY');
