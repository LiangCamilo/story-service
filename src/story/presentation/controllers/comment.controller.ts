import { Body, Controller, Post } from '@nestjs/common';
import { CreateCommentDto } from 'src/story/application/dtos/comment-dtos/create-comment.dto';
import { CreateCommentUseCase } from 'src/story/application/use-cases/comment-use-cases/create-comment.use-case';

@Controller('api/comment')
export class CommentController {
  constructor(private createCommentUseCase: CreateCommentUseCase) {}

  @Post('create')
  async create(@Body() createCommentDto: CreateCommentDto) {
    const newComment =
      await this.createCommentUseCase.execute(createCommentDto);

    return {
      message: 'El comentario ha sido creado de forma correcta',
      comment: newComment,
    };
  }
}
