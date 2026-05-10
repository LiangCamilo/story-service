import { Tag } from 'src/story/domain/entities/tag.entity';
import { SearchTagsByNameDto } from '../dtos/tag-dtos/search-tags-by-name.dto';

export interface TagRepositoryPort {
  findTagsByName(tagNames: string[]): Promise<Tag[]>;
  createTag(name: string): Promise<Tag>;
  createMultipleTags(tagNames: Tag[]): Promise<Tag[]>;
  deleteTagById(id: string): Promise<void | null>;
  deleteTagByName(name: string): Promise<void | null>;
  searchTagsByName(searchTagsByNameDto: SearchTagsByNameDto): Promise<Tag[]>;
}

export const TAG_REPOSITORY = Symbol('TAG_REPOSITORY');
