import { Inject, Injectable } from '@nestjs/common';
import {
  STORY_REPOSITORY,
  StoryRepositoryPort,
} from '../../ports/story.repository';
import {
  COMMENT_REPOSITORY,
  CommentRepositoryPort,
} from '../../ports/comment.repository';
import { StoryNotFoundError } from '../../errors/story-errors/story-not-found.error';
import { SearchCommentDto } from '../../dtos/comment-dtos/search-comment.dto';

@Injectable()
export class SearchStoryCommentsUseCase {
  constructor(
    @Inject(STORY_REPOSITORY) private storyRepository: StoryRepositoryPort,
    @Inject(COMMENT_REPOSITORY)
    private commentRepository: CommentRepositoryPort,
  ) {}

  async execute(storyId: string, dto: SearchCommentDto) {
    const findStory = await this.storyRepository.findById(storyId);

    if (!findStory) {
      throw new StoryNotFoundError(404, undefined, storyId);
    }

    const { comments, totalItems } =
      await this.commentRepository.searchStoryComments(storyId, dto);

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
