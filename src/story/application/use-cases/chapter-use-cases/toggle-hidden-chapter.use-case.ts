import { Inject, Injectable } from '@nestjs/common';
import {
  CHAPTER_REPOSITORY,
  ChapterRepositoryPort,
} from '../../ports/chapter.repository';
import { StoryNotFoundChapterError } from '../../errors/chapter-errors/story-not-found-chapter.error';

@Injectable()
export class ToggleHiddenChapterUseCase {
  constructor(
    @Inject(CHAPTER_REPOSITORY)
    private chapterRepository: ChapterRepositoryPort,
  ) {}

  async execute(id: string) {
    const toggledPublication = await this.chapterRepository.toggleHidden(id);

    if (!toggledPublication) {
      throw new StoryNotFoundChapterError(404, undefined, id);
    }

    return toggledPublication;
  }
}
