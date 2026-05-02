export interface StoryWithDetails {
  id: string;
  title: string;
  description: string;
  hidden: boolean;
  userId: string;
  userEmail: string;
  coverUrl: string;
  genre: { id: string; name: string };
  secondaryGenre?: { id: string; name: string };
  tags: { id: string; name: string }[];
  totalRating: number;
  totalChapters: number;
  totalViews: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
