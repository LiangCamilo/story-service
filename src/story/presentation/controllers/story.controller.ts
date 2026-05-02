import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CreateStoryUseCase } from '../../application/use-cases/story-use-cases/create-story.use-case';
import { CreateStoryDto } from '../../application/dtos/story-dtos/create-story.dto';
import { Story } from '../../domain/entities/story.entity';
import { FindStoryByTitleUseCase } from '../../application/use-cases/story-use-cases/find-story-by-title.use-case';
import { FindStoryByIdUseCase } from '../../application/use-cases/story-use-cases/find-story-by-id.use-case';
import { FindMultipleStoryDto } from '../../application/dtos/story-dtos/find-multiple-story.dto';
import { FilterMultipleStoryDto } from '../../application/dtos/story-dtos/filter-multilple-story.dto';
import { FindAndFilterMultipleStoryUseCase } from '../../application/use-cases/story-use-cases/find-and-filter-multiple-story.use-case';
import { StoryExceptionFilter } from '../filters/story-exception.filter';
import { GenreExceptionFilter } from '../filters/genre-exception.filter';
import { DeleteStoryByIdUseCase } from '../../application/use-cases/story-use-cases/delete-story-by-id.use-case';
import { UpdateStoryUseCase } from '../../application/use-cases/story-use-cases/update-story.use-case';
import { UpdateStoryDto } from '../../application/dtos/story-dtos/update-story.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@UseFilters(StoryExceptionFilter, GenreExceptionFilter)
@Controller('api/story')
export class StoryController {
  constructor(
    private createStoryUseCase: CreateStoryUseCase,
    private findStoryByTitleUseCase: FindStoryByTitleUseCase,
    private findStoryByIdUseCase: FindStoryByIdUseCase,
    private findAndFilterMultipleStoryUseCase: FindAndFilterMultipleStoryUseCase,
    private deleteStoryByIdUseCase: DeleteStoryByIdUseCase,
    private updateStoryUseCase: UpdateStoryUseCase,
  ) {}

  @Post('create')
  @HttpCode(201)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
    }),
  )
  async createStory(
    @Body() createStoryDto: CreateStoryDto,
    @UploadedFile() cover?: Express.Multer.File,
  ) {
    const uploadedFile = cover
      ? {
          buffer: cover?.buffer,
          originalName: cover?.originalname,
          mimeType: cover?.mimetype,
          size: cover?.size,
        }
      : undefined;

    const story = await this.createStoryUseCase.execute(
      createStoryDto,
      uploadedFile,
    );
    return this.mapStoryToResponse(story);
  }

  @Get('title/:title')
  async findByTitle(@Param('title') title: string) {
    return this.findStoryByTitleUseCase.execute(title);
  }

  @Get('id/:id')
  async findById(@Param('id') id: string) {
    return this.findStoryByIdUseCase.execute(id);
  }

  @Post('filter')
  async findAndFilterMultiple(
    @Query() findMultipleStoryDto: FindMultipleStoryDto,
    @Body() filterMultipleStoryDto: FilterMultipleStoryDto,
  ) {
    const { stories, meta } =
      await this.findAndFilterMultipleStoryUseCase.execute(
        findMultipleStoryDto,
        filterMultipleStoryDto,
      );

    if (stories.length === 0) {
      return {
        message: 'No se han encontrado historias con los filtros especificados',
      };
    }

    return {
      data: stories,
      meta,
    };
  }

  @Delete('delete/:id')
  async deleteStoryById(@Param('id') id: string) {
    const deletedStory = await this.deleteStoryByIdUseCase.execute(id);

    return {
      message: `Se eliminó de manera exitosa la historia con id: ${deletedStory.id}`,
    };
  }

  @Put('update/:id')
  async updateStory(
    @Param('id') id: string,
    @Body() updateStoryDto: UpdateStoryDto,
  ) {
    return this.updateStoryUseCase.execute(id, updateStoryDto);
  }

  private mapStoryToResponse = (story: Story) => {
    return {
      id: story.getId.getValue,
      title: story.getTitle.getValue,
      description: story.getDescription.getValue,
      hidden: story.getHidden,
      author: story.getUserId,
      userEmail: story.getUserEmail,
      coverUrl: story.getCoverUrl,
      genreId: story.getGenreId,
      totalRating: story.getTotalRating?.getValue,
      totalChapters: story.getTotalChapters?.getValue,
      secondaryGenreId: story?.getSecondaryGenreId,
      totalViews: story?.getTotalViews?.getValue,
      createdAt: story.getCreatedAt?.getDate(),
      updatedAt: story.getUpdatedAt?.getDate(),
    };
  };
}
