import { Inject, Injectable } from '@nestjs/common';
import {
  COMMENT_REPOSITORY,
  CommentRepositoryPort,
} from '../../ports/comment.repository';
import { CreateCommentDto } from '../../dtos/comment-dtos/create-comment.dto';
import {
  CHAPTER_REPOSITORY,
  ChapterRepositoryPort,
} from '../../ports/chapter.repository';
import { UncertainOriginCommentError } from '../../errors/comment-errors/uncertain-origin-comment.error';
import { ChapterNotFoundError } from '../../errors/chapter-errors/chapter-not-found.error';
import {
  STORY_REPOSITORY,
  StoryRepositoryPort,
} from '../../ports/story.repository';
import { StoryNotFoundError } from '../../errors/story-errors/story-not-found.error';

@Injectable()
export class CreateCommentUseCase {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private commentRepository: CommentRepositoryPort,

    @Inject(CHAPTER_REPOSITORY)
    private chapterRepository: ChapterRepositoryPort,

    @Inject(STORY_REPOSITORY)
    private storyRepository: StoryRepositoryPort,
  ) {}

  async execute(createCommentDto: CreateCommentDto) {
    if (createCommentDto.chapterId) {
      const findChapter = await this.chapterRepository.findChapterById(
        createCommentDto.chapterId,
      );

      if (!findChapter) {
        throw new ChapterNotFoundError(
          404,
          undefined,
          createCommentDto.chapterId,
          undefined,
        );
      }
    }

    if (createCommentDto.storyId) {
      const findStory = await this.storyRepository.findById(
        createCommentDto.storyId,
      );

      if (!findStory) {
        throw new StoryNotFoundError(404, undefined, createCommentDto.storyId);
      }
    }

    const newComment = await this.commentRepository.create(createCommentDto);

    if (!newComment) {
      throw new UncertainOriginCommentError(
        404,
        createCommentDto.userId,
        undefined,
        createCommentDto.chapterId,
        createCommentDto.storyId,
      );
    }

    return newComment;
  }
}
