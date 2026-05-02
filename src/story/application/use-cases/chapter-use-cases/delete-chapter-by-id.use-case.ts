import { Inject, Injectable } from '@nestjs/common';
import {
  CHAPTER_REPOSITORY,
  ChapterRepositoryPort,
} from '../../ports/chapter.repository';
import { ChapterNotFoundError } from '../../errors/chapter-errors/story-not-found.error';

@Injectable()
export class DeleteChapterByIdUseCase {
  constructor(
    @Inject(CHAPTER_REPOSITORY)
    private chapterRepository: ChapterRepositoryPort,
  ) {}

  async execute(chapterId: string, storyId: string) {
    const deletedChapter = await this.chapterRepository.deleteChapterById(
      chapterId,
      storyId,
    );

    if (!deletedChapter) {
      throw new ChapterNotFoundError(404, undefined, chapterId, storyId);
    }

    return deletedChapter;
  }
}
