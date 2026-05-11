import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Patch,
  UseFilters,
  Get,
  Query,
} from '@nestjs/common';
import { CreateCommentDto } from 'src/story/application/dtos/comment-dtos/create-comment.dto';
import { CreateCommentUseCase } from 'src/story/application/use-cases/comment-use-cases/create-comment.use-case';
import { StoryExceptionFilter } from '../filters/story-exception.filter';
import { ChapterExceptionFilter } from '../filters/chapter-exception.filter';
import { CommentExceptionFilter } from '../filters/comment-exception.filter';
import { DeleteCommentUseCase } from 'src/story/application/use-cases/comment-use-cases/delete-comment.use-case';

import { UpdateCommentDto } from 'src/story/application/dtos/comment-dtos/update-comment.dto';
import { UpdateCommentUseCase } from 'src/story/application/use-cases/comment-use-cases/update-comment.use-case';
import { ToggleCommentLikeUseCase } from 'src/story/application/use-cases/comment-use-cases/toggle-comment-like.use-case';
import { SearchCommentDto } from 'src/story/application/dtos/comment-dtos/search-comment.dto';
import { SearchStoryCommentsUseCase } from 'src/story/application/use-cases/comment-use-cases/search-story-comments.use-case';
import { SearchChapterCommentsUseCase } from 'src/story/application/use-cases/comment-use-cases/search-chapter-comments.use-case';

@Controller('api/comment')
@UseFilters(
  StoryExceptionFilter,
  ChapterExceptionFilter,
  CommentExceptionFilter,
)
export class CommentController {
  constructor(
    private createCommentUseCase: CreateCommentUseCase,
    private deleteCommentUseCase: DeleteCommentUseCase,
    private updateCommentUseCase: UpdateCommentUseCase,
    private toggleCommentLikeUseCase: ToggleCommentLikeUseCase,
    private searchStoryCommentsUseCase: SearchStoryCommentsUseCase,
    private searchChapterCommentsUseCase: SearchChapterCommentsUseCase,
  ) {}

  @Post('create')
  async create(@Body() createCommentDto: CreateCommentDto) {
    const newComment =
      await this.createCommentUseCase.execute(createCommentDto);

    return {
      message: 'El comentario ha sido creado de forma correcta',
      comment: newComment.toPrimitives(),
    };
  }

  @Delete(':commentId')
  async delete(@Param('commentId') commentId: string) {
    const deletedComment = await this.deleteCommentUseCase.execute(commentId);

    return {
      comment: deletedComment.toPrimitives(),
      message: `El comentario de id ${deletedComment.getId.getValue} fue eliminado de manera exitosa`,
    };
  }

  @Patch('update/:commentId')
  async update(
    @Param('commentId') commentId: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const updatedComment = await this.updateCommentUseCase.execute(
      commentId,
      updateCommentDto,
    );

    return {
      comment: updatedComment.toPrimitives(),
      message: 'El comentario ha sido actualizado exitosamente',
    };
  }

  @Get('search/story/:storyId')
  async searchStoryComments(
    @Param('storyId') storyId: string,
    @Query() searchCommentDto: SearchCommentDto,
  ) {
    const { meta, comments } = await this.searchStoryCommentsUseCase.execute(
      storyId,
      searchCommentDto,
    );

    return {
      comments: comments.map((comment) => {
        return comment.toPrimitives();
      }),
      meta,
    };
  }

  @Get('search/chapter/:chapterId')
  async searchChapterComments(
    @Param('chapterId') chapterId: string,
    @Query() searhCommentDto: SearchCommentDto,
  ) {
    const { meta, comments } = await this.searchChapterCommentsUseCase.execute(
      chapterId,
      searhCommentDto,
    );

    return {
      comments: comments.map((comment) => {
        return comment.toPrimitives();
      }),
      meta,
    };
  }

  @Patch('toggle-like/:commentId/:userId')
  async toggleLike(
    @Param('commentId') commentId: string,
    @Param('userId') userId: string,
  ) {
    const updatedComment = await this.toggleCommentLikeUseCase.execute(
      commentId,
      userId,
    );

    return {
      comment: updatedComment.toPrimitives(),
      message: 'Like actualizado exitosamente',
    };
  }
}
