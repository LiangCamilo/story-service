import { Chapter } from 'src/story/domain/entities/chapter.entity';
import { ChapterWithDetails } from '../read-models/chapter-with-details.read-model';
import { UpdateChapterDto } from '../dtos/chapter-dtos/update-chapter.dto';
import { FindAllChaptersDto } from '../dtos/chapter-dtos/find-all-chapters.dto';

export interface ChapterRepositoryPort {
  create(chapter: Chapter): Promise<ChapterWithDetails | undefined>;
  findChapterById(id: string): Promise<ChapterWithDetails | undefined>;
  findAllChaptersByStoryId(
    storyId: string,
    findALlChaptersDto: FindAllChaptersDto,
  ): Promise<{
    chapters: ChapterWithDetails[];
    totalItems: number;
  }>;
  findChaptersByOwnedStoryId(
    storyId: string,
    findAllChaptersDto: FindAllChaptersDto,
  ): Promise<{ chapters: ChapterWithDetails[]; totalItems: number }>;
  deleteChapterById(
    chapterId: string,
    storyId: string,
  ): Promise<string | undefined>;
  updateChapter(
    id: string,
    updateChapterDto: UpdateChapterDto,
  ): Promise<ChapterWithDetails>;
  toggleHidden(id: string): Promise<ChapterWithDetails | undefined>;
}

export const CHAPTER_REPOSITORY = Symbol('CHAPTER_REPOSITORY');
