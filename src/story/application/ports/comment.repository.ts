import { Comment } from 'src/story/domain/entities/comment.entity';
import { CreateCommentDto } from '../dtos/comment-dtos/create-comment.dto';

export interface CommentRepositoryPort {
  create(createCommentDto: CreateCommentDto): Promise<Comment | undefined>;
  delete(commentId: string): Promise<Comment | undefined>;
  update(commentId: string, content: string): Promise<Comment | undefined>;
}

export const COMMENT_REPOSITORY = Symbol('COMMENT_REPOSITORY');
