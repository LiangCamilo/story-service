import { StoryWithDetails } from './story-with-details.read-model';

export interface FavoriteStoryWithDetails {
  id: string;
  storyId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
  story: StoryWithDetails;
}
