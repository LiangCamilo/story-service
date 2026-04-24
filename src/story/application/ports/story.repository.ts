import { Story } from 'src/story/domain/entities/story.entity';

export interface StoryRepositoryPort {
  createStory(story: Story): Promise<Story>;
  findByTitle(title: string): Promise<Story | null>;
  findById(id: string): Promise<Story | null>;
}

export const STORY_REPOSITORY = Symbol('STORY_REPOSITORY');
