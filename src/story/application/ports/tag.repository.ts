import { Tag } from 'src/story/domain/entities/tag.entity';

export interface TagRepositoryPort {
  findTagsByName(tagNames: string[]): Promise<Tag[]>;
  createTag(name: string): Promise<Tag>;
  deleteTagById(id: string): Promise<void | null>;
  deleteTagByName(name: string): Promise<void>;
}

export const TAG_REPOSITORY = Symbol('TAG_REPOSITORY');
