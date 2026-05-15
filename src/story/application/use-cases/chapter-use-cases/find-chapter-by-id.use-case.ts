import { Inject, Injectable } from '@nestjs/common';
import {
  CHAPTER_REPOSITORY,
  ChapterRepositoryPort,
} from '../../ports/chapter.repository';
import { ChapterNotFoundError } from '../../errors/chapter-errors/chapter-not-found.error';

@Injectable()
export class FindChapterByIdUseCase {
  constructor(
    @Inject(CHAPTER_REPOSITORY)
    private chapterRepository: ChapterRepositoryPort,
  ) {}

  async execute(chapterId: string) {
    const chapter = await this.chapterRepository.findChapterById(chapterId);

    if (!chapter) {
      throw new ChapterNotFoundError(404, undefined, chapterId);
    }

    return chapter;
  }
}
