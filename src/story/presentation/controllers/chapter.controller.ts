import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { CreateChapterDto } from '../../application/dtos/chapter-dtos/create-chapter.dto';
import { CreateChapterUseCase } from '../../application/use-cases/chapter-use-cases/create-chapter.use-case';
import { StoryExceptionFilter } from '../filters/story-exception.filter';
import { FindAllChaptersByStoryIdUseCase } from '../../application/use-cases/chapter-use-cases/find-all-chapters-by-story-id.use-case';
import { DeleteChapterByIdUseCase } from '../../application/use-cases/chapter-use-cases/delete-chapter-by-id.use-case';
import { ChapterExceptionFilter } from '../filters/chapter-exception.filter';
import { UpdateChapterUseCase } from '../../application/use-cases/chapter-use-cases/update-chapter.use-case';
import { UpdateChapterDto } from '../../application/dtos/chapter-dtos/update-chapter.dto';
import { ToggleHiddenChapterUseCase } from 'src/story/application/use-cases/chapter-use-cases/toggle-hidden-chapter.use-case';
import { FindChaptersByOwnedStoryIdUseCase } from 'src/story/application/use-cases/chapter-use-cases/find-chapters-by-owned-story-id.use-case';
import { FindAllChaptersDto } from 'src/story/application/dtos/chapter-dtos/find-all-chapters.dto';
import { FindChapterByIdUseCase } from 'src/story/application/use-cases/chapter-use-cases/find-chapter-by-id.use-case';

@UseFilters(StoryExceptionFilter, ChapterExceptionFilter)
@Controller('api/chapter')
export class ChapterController {
  constructor(
    private createChapterUseCase: CreateChapterUseCase,
    private findAllChaptersByStoryIdUseCase: FindAllChaptersByStoryIdUseCase,
    private deleteChapterByIdUseCase: DeleteChapterByIdUseCase,
    private updateChapterUseCase: UpdateChapterUseCase,
    private toggleHiddenChapterUseCase: ToggleHiddenChapterUseCase,
    private findChaptersByOwnedStoryId: FindChaptersByOwnedStoryIdUseCase,
    private findChapterByIdUseCase: FindChapterByIdUseCase,
  ) {}

  @Get(':storyId')
  async findAllChaptersByStoryId(
    @Param('storyId') storyId: string,
    @Query() findAllChaptersDto: FindAllChaptersDto,
  ) {
    const { chapters, meta } =
      await this.findAllChaptersByStoryIdUseCase.execute(
        storyId,
        findAllChaptersDto,
      );
    return {
      data: chapters,
      meta,
    };
  }

  @Get('my-chapters/:storyId')
  async findOwnedChaptersByStoryId(
    @Param('storyId') storyId: string,
    @Query() findAllChaptersDto: FindAllChaptersDto,
  ) {
    const { chapters, meta } = await this.findChaptersByOwnedStoryId.execute(
      storyId,
      findAllChaptersDto,
    );
    return {
      data: chapters,
      meta,
    };
  }

  @Get('id/:chapterId')
  async findChapterById(@Param('chapterId') chapterId: string) {
    return await this.findChapterByIdUseCase.execute(chapterId);
  }

  @Post('create')
  async create(@Body() createChapterDto: CreateChapterDto) {
    const newChapter =
      await this.createChapterUseCase.execute(createChapterDto);
    return newChapter;
  }

  @Patch('toggle-hidden/:id')
  async toggleHiddenStory(@Param('id') id: string) {
    const updatedChapter = await this.toggleHiddenChapterUseCase.execute(id);
    return updatedChapter;
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
    const updatedChapter = await this.updateChapterUseCase.execute(
      id,
      updateChapterDto,
    );

    return updatedChapter;
  }
}
