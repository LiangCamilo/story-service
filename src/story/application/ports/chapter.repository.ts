import { Chapter } from 'src/story/domain/entities/chapter.entity';
import { ChapterWithDetails } from '../read-models/chapter-with-details.read-model';
import { UpdateChapterDto } from '../dtos/chapter-dtos/update-chapter.dto';

export interface ChapterRepositoryPort {
  create(chapter: Chapter): Promise<ChapterWithDetails | undefined>;
  findChapterById(id: string): Promise<ChapterWithDetails | undefined>;
  findAllChaptersByStoryId(storyId: string): Promise<Chapter[]>;
  deleteChapterById(
    chapterId: string,
    storyId: string,
  ): Promise<string | undefined>;
  updateChapter(
    id: string,
    updateChapterDto: UpdateChapterDto,
  ): Promise<Chapter>;
  toggleHidden(id: string): Promise<Chapter | undefined>;
}

export const CHAPTER_REPOSITORY = Symbol('CHAPTER_REPOSITORY');
