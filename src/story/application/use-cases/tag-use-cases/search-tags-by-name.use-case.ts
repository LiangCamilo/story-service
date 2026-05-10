import { Inject, Injectable } from '@nestjs/common';
import { TAG_REPOSITORY, TagRepositoryPort } from '../../ports/tag.repository';
import { SearchTagsByNameDto } from '../../dtos/tag-dtos/search-tags-by-name.dto';

@Injectable()
export class SearchTagsBynameUseCase {
  constructor(
    @Inject(TAG_REPOSITORY) private tagRepository: TagRepositoryPort,
  ) {}

  async execute(searchTagsByNameDto: SearchTagsByNameDto) {
    const { limit, offset } = searchTagsByNameDto;

    const tagsByName =
      await this.tagRepository.searchTagsByName(searchTagsByNameDto);

    const pageSize: number = limit;
    const totalItems = tagsByName.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const numberPage = Math.floor(offset / limit) + 1;

    return {
      tags: tagsByName,
      meta: {
        totalItems,
        pageSize,
        totalPages,
        numberPage,
      },
    };
  }
}
