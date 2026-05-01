import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { CreateStoryUseCase } from '../application/use-cases/story-use-cases/create-story.use-case';
import { CreateStoryDto } from '../application/dtos/story-dtos/create-story.dto';
import { Story } from '../domain/entities/story.entity';
import { FindStoryByTitleUseCase } from '../application/use-cases/story-use-cases/find-story-by-title.use-case';
import { FindStoryByIdUseCase } from '../application/use-cases/story-use-cases/find-story-by-id.use-case';
import { FindMultipleStoryDto } from '../application/dtos/story-dtos/find-multiple-story.dto';
import { FilterMultipleStoryDto } from '../application/dtos/story-dtos/filter-multilple-story.dto';
import { FindAndFilterMultipleStoryUseCase } from '../application/use-cases/story-use-cases/find-and-filter-multiple-story.use-case';
import { StoryExceptionFilter } from './filters/story-exception.filter';
import { GenreExceptionFilter } from './filters/genre-exception.filter';
import { DeleteStoryByIdUseCase } from '../application/use-cases/story-use-cases/delete-story-by-id.use-case';

@UseFilters(StoryExceptionFilter, GenreExceptionFilter)
@Controller('api/story')
export class StoryController {
  constructor(
    private createStoryUseCase: CreateStoryUseCase,
    private findStoryByTitleUseCase: FindStoryByTitleUseCase,
    private findStoryByIdUseCase: FindStoryByIdUseCase,
    private findAndFilterMultipleStoryUseCase: FindAndFilterMultipleStoryUseCase,
    private deleteStoryByIdUseCase: DeleteStoryByIdUseCase,
  ) {}

  @Post('create')
  @HttpCode(201)
  async createStory(@Body() request: CreateStoryDto) {
    console.log(request);
    const story = await this.createStoryUseCase.execute(request);
    return this.mapStoryToResponse(story);
  }

  @Get('title/:title')
  async findByTitle(@Param('title') title: string) {
    const story = await this.findStoryByTitleUseCase.execute(title);
    return this.mapStoryToResponse(story);
  }

  @Get('id/:id')
  async findById(@Param('id') id: string) {
    const story = await this.findStoryByIdUseCase.execute(id);
    return this.mapStoryToResponse(story);
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

    if (!stories) {
      return {
        message: 'No se han encontrado historias con los filtros especificados',
      };
    } else {
      return {
        data: stories.map((story: Story) => {
          return this.mapStoryToResponse(story);
        }),
        meta,
      };
    }
  }

  @Delete('delete/:id')
  async deleteStoryById(@Param('id') id: string) {
    const deletedStory = await this.deleteStoryByIdUseCase.execute(id);

    return {
      message: `Se eliminó de manera exitosa la historia con id: ${deletedStory.getId.getValue}`,
    };
  }

  private mapStoryToResponse = (story: Story) => {
    return {
      id: story.getId.getValue,
      title: story.getTitle.getValue,
      description: story.getDescription.getValue,
      hidden: story.getHidden,
      author: story.getUserId,
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
