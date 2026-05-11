import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseFilters,
} from '@nestjs/common';
import { CreateCommentDto } from 'src/story/application/dtos/comment-dtos/create-comment.dto';
import { CreateCommentUseCase } from 'src/story/application/use-cases/comment-use-cases/create-comment.use-case';
import { StoryExceptionFilter } from '../filters/story-exception.filter';
import { ChapterExceptionFilter } from '../filters/chapter-exception.filter';
import { CommentExceptionFilter } from '../filters/comment-exception.filter';
import { DeleteCommentUseCase } from 'src/story/application/use-cases/comment-use-cases/delete-comment.use-case';

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
}
