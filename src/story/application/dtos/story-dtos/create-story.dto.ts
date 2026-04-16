export interface CreateStoryDto {
  title: string;
  description: string;
  genreId: string;
  userId: string;
  secondaryGenreId?: string;
  tagNames: string[];
}
