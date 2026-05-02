import { Chapter } from 'src/story/domain/entities/chapter.entity';
import { ChapterWithDetails } from '../read-models/chapter-with-details.read-model';

export interface ChapterRepositoryPort {
  create(chapter: Chapter): Promise<Chapter>;
  findChapterById(id: string): Promise<ChapterWithDetails | undefined>;
}

export const CHAPTER_REPOSITORY = Symbol('CHAPTER_REPOSITORY');
