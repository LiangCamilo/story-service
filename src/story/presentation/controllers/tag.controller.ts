import { Controller, Get, Query } from '@nestjs/common';
import { SearchTagsByNameDto } from 'src/story/application/dtos/tag-dtos/search-tags-by-name.dto';
import { SearchTagsBynameUseCase } from 'src/story/application/use-cases/tag-use-cases/search-tags-by-name.use-case';

@Controller('api/tag')
export class TagController {
  constructor(private searchTagsByNameUseCase: SearchTagsBynameUseCase) {}

  @Get('/search')
  async searchTagByName(@Query() searchTagsByNameDto: SearchTagsByNameDto) {
    const { tags, meta } =
      await this.searchTagsByNameUseCase.execute(searchTagsByNameDto);

    return {
      data: tags.map((tag) => {
        return tag.toPrimitives();
      }),
      meta,
    };
  }
}
