import { Inject, Injectable } from '@nestjs/common';
import {
  CHAPTER_REPOSITORY,
  ChapterRepositoryPort,
} from '../../ports/chapter.repository';

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
  }
}
