import { Inject, Injectable } from '@nestjs/common';
import {
  CHAPTER_REPOSITORY,
  ChapterRepositoryPort,
} from '../../ports/chapter.repository';
import { UpdateChapterDto } from '../../dtos/chapter-dtos/update-chapter.dto';
import { UpdateChapterError } from '../../errors/chapter-errors/update-chapter-error';

@Injectable()
export class UpdateChapterUseCase {
  constructor(
    @Inject(CHAPTER_REPOSITORY)
    private chapterRepository: ChapterRepositoryPort,
  ) {}

  async execute(id: string, updateChapterDto: UpdateChapterDto) {
    try {
      return await this.chapterRepository.updateChapter(id, updateChapterDto);
    } catch {
      throw new UpdateChapterError(404, undefined, id, undefined);
    }
  }
}
