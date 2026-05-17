import { Inject, Injectable } from '@nestjs/common';
import {
  CHAPTER_REPOSITORY,
  ChapterRepositoryPort,
} from '../../ports/chapter.repository';
import { ChapterNotFoundError } from '../../errors/chapter-errors/chapter-not-found.error';

@Injectable()
export class ToggleHiddenChapterUseCase {
  constructor(
    @Inject(CHAPTER_REPOSITORY)
    private chapterRepository: ChapterRepositoryPort,
  ) {}

  async execute(id: string) {
    const toggledPublication = await this.chapterRepository.toggleHidden(id);

    if (!toggledPublication) {
      throw new ChapterNotFoundError(404, undefined, id);
    }

    return toggledPublication;
  }
}
