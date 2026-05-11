import { Inject, Injectable } from '@nestjs/common';
import {
  CHAPTER_REPOSITORY,
  ChapterRepositoryPort,
} from '../../ports/chapter.repository';
import { SearchCommentDto } from '../../dtos/comment-dtos/search-comment.dto';
import {
  COMMENT_REPOSITORY,
  CommentRepositoryPort,
} from '../../ports/comment.repository';
import { ChapterNotFoundError } from '../../errors/chapter-errors/chapter-not-found.error';

@Injectable()
export class SearchChapterCommentsUseCase {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private commentRepository: CommentRepositoryPort,
    @Inject(CHAPTER_REPOSITORY)
    private chapterRepository: ChapterRepositoryPort,
  ) {}

  async execute(chapterId: string, dto: SearchCommentDto) {
    const findChapter = await this.chapterRepository.findChapterById(chapterId);

    if (!findChapter) {
      throw new ChapterNotFoundError(404, undefined, chapterId, undefined);
    }

    const { comments, totalItems } =
      await this.commentRepository.searchChapterComments(chapterId, dto);

    const pageSize: number = dto.limit;
    const totalPages = Math.ceil(totalItems / pageSize);
    const numberPage = Math.floor(dto.offset / dto.limit) + 1;

    return {
      comments,
      meta: {
        totalItems,
        pageSize,
        totalPages,
        numberPage,
      },
    };
  }
}
