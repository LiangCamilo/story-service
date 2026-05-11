export interface ChapterWithDetails {
  id: string;
  title: string;
  order: number;
  story: {
    id: string;
    title: string;
  };
  hidden: boolean;
  content: string;
  totalComments: number;
  createdAt: Date;
  updatedAt: Date | null;
}
