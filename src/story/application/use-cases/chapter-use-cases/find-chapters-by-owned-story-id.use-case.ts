import { Inject, Injectable } from '@nestjs/common';
import {
  CHAPTER_REPOSITORY,
  ChapterRepositoryPort,
} from '../../ports/chapter.repository';
import { FindAllChaptersDto } from '../../dtos/chapter-dtos/find-all-chapters.dto';

@Injectable()
export class FindChaptersByOwnedStoryIdUseCase {
  constructor(
    @Inject(CHAPTER_REPOSITORY)
    private chapterRepository: ChapterRepositoryPort,
  ) {}

  async execute(storyId: string, findAllChaptersDto: FindAllChaptersDto) {
    const { limit, offset } = findAllChaptersDto;

    const { chapters, totalItems } =
      await this.chapterRepository.findChaptersByOwnedStoryId(
        storyId,
        findAllChaptersDto,
      );

    const pageSize: number = limit;
    const totalPages = Math.ceil(totalItems / pageSize);
    const numberPage = offset;

    return {
      chapters,
      meta: {
        totalItems,
        pageSize,
        totalPages,
        numberPage,
      },
    };
  }
}
