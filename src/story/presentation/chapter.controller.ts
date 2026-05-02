import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CreateChapterDto } from '../application/dtos/chapter-dtos/create-chapter.dto';
import { CreateChapterUseCase } from '../application/use-cases/chapter-use-cases/create-chapter.use-case';
import { StoryExceptionFilter } from './filters/story-exception.filter';

@UseFilters(StoryExceptionFilter)
@Controller('api/chapter')
export class ChapterController {
  constructor(private createChapterUseCase: CreateChapterUseCase) {}

  @Post('create')
  async create(@Body() createChapterDto: CreateChapterDto) {
    const newChapter =
      await this.createChapterUseCase.execute(createChapterDto);

    return newChapter;
  }
}
