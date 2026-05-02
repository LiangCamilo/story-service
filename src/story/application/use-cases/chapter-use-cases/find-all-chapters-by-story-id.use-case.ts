import { Inject, Injectable } from '@nestjs/common';
import {
  CHAPTER_REPOSITORY,
  ChapterRepositoryPort,
} from '../../ports/chapter.repository';

@Injectable()
export class FindAllChaptersByStoryIdUseCase {
  constructor(
    @Inject(CHAPTER_REPOSITORY)
    private chapterRepository: ChapterRepositoryPort,
  ) {}

  async execute(storyId: string) {
    return await this.chapterRepository.findAllChaptersByStoryId(storyId);
  }
}
