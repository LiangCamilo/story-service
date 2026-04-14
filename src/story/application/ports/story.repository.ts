import { Story } from 'src/story/domain/entities/story.entity';

export interface StoryRepositoryPort {
  createStory(story: Story): Promise<Story>;
  findByName(title: string): Promise<Story | null>;
}

export const STORY_REPOSITORY = Symbol('STORY_REPOSITORY');
