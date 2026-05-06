import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { CreateChapterDto } from '../../application/dtos/chapter-dtos/create-chapter.dto';
import { CreateChapterUseCase } from '../../application/use-cases/chapter-use-cases/create-chapter.use-case';
import { StoryExceptionFilter } from '../filters/story-exception.filter';
import { FindAllChaptersByStoryIdUseCase } from '../../application/use-cases/chapter-use-cases/find-all-chapters-by-story-id.use-case';
import { Chapter } from '../../domain/entities/chapter.entity';
import { DeleteChapterByIdUseCase } from '../../application/use-cases/chapter-use-cases/delete-chapter-by-id.use-case';
import { ChapterExceptionFilter } from '../filters/chapter-exception.filter';
import { UpdateChapterUseCase } from '../../application/use-cases/chapter-use-cases/update-chapter.use-case';
import { UpdateChapterDto } from '../../application/dtos/chapter-dtos/update-chapter.dto';

@UseFilters(StoryExceptionFilter, ChapterExceptionFilter)
@Controller('api/chapter')
export class ChapterController {
  constructor(
    private createChapterUseCase: CreateChapterUseCase,
    private findAllChaptersByStoryIdUseCase: FindAllChaptersByStoryIdUseCase,
    private deleteChapterByIdUseCase: DeleteChapterByIdUseCase,
    private updateChapterUseCase: UpdateChapterUseCase,
  ) {}

  @Get(':storyId')
  async findAllChaptersByStoryId(@Param('storyId') storyId: string) {
    const allChapters =
      await this.findAllChaptersByStoryIdUseCase.execute(storyId);
    return allChapters.map((chapter) => {
      return this.mapChapterToResponse(chapter);
    });
  }

  @Post('create')
  async create(@Body() createChapterDto: CreateChapterDto) {
    const newChapter =
      await this.createChapterUseCase.execute(createChapterDto);
    return newChapter;
  }

  @Delete(':storyId/chapter/:chapterId')
  async deleteChapterById(
    @Param('storyId') storyId: string,
    @Param('chapterId') chapterId: string,
  ) {
    const deletedChapter = await this.deleteChapterByIdUseCase.execute(
      chapterId,
      storyId,
    );

    return {
      message: `El capitulo de titulo ${deletedChapter} fue eliminado exitosamente`,
    };
  }

  @Patch('update/:id')
  async updateChapter(
    @Param('id') id: string,
    @Body() updateChapterDto: UpdateChapterDto,
  ) {
    return await this.updateChapterUseCase.execute(id, updateChapterDto);
  }

  private mapChapterToResponse = (chapter: Chapter) => {
    return {
      id: chapter.getId.getValue,
      order: chapter.getOrder.getValue,
      title: chapter.getTitle.getValue,
      storyId: chapter.getStoryId,
      content: chapter.getContent,
      createdAt: chapter.getCreatedAt,
      updatedAt: chapter.getUpdatedAt,
    };
  };
}
