export interface ChapterWithDetails {
  id: string;
  title: string;
  order: number;
  story: {
    id: string;
    title: string;
  };
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
}
