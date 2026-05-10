import { Comment } from 'src/story/domain/entities/comment.entity';
import { CreateCommentDto } from '../dtos/comment-dtos/create-comment.dto';

export interface CommentRepositoryPort {
  create(createCommentDto: CreateCommentDto): Promise<Comment | undefined>;
}

export const COMMENT_REPOSITORY = Symbol('COMMENT_REPOSITORY');
