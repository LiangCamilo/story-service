export interface StoryWithDetails {
  id: string;
  title: string;
  description: string;
  hidden: boolean;
  userId: string;
  coverUrl: string | null;
  genre: { id: string; name: string };
  secondaryGenre?: { id: string; name: string };
  tags: { id: string; name: string }[];
  totalRating: number;
  ratingSum: number;
  ratingCount: number;
  totalChapters: number;
  totalViews: number;
  totalFavorites: number;
  status: string;
  createdAt: Date;
  updatedAt: Date | null;
  lastActivityAt?: Date | null;
  chapters?: {
    id: string;
    title: string;
    order: number;
    hidden: boolean;
    content: string;
    createdAt: Date;
    updatedAt: Date | null;
  }[];
}
