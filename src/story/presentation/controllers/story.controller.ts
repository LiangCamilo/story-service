import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { CreateStoryUseCase } from '../../application/use-cases/story-use-cases/create-story.use-case';
import { CreateStoryDto } from '../../application/dtos/story-dtos/create-story.dto';
import { Story } from '../../domain/entities/story.entity';
import { FindStoryByTitleUseCase } from '../../application/use-cases/story-use-cases/find-story-by-title.use-case';
import { FindStoryByIdUseCase } from '../../application/use-cases/story-use-cases/find-story-by-id.use-case';
import { FilterMultipleStoryDto } from '../../application/dtos/story-dtos/filter-multilple-story.dto';
import { FindAndFilterMultipleStoryUseCase } from '../../application/use-cases/story-use-cases/find-and-filter-multiple-story.use-case';
import { StoryExceptionFilter } from '../filters/story-exception.filter';
import { GenreExceptionFilter } from '../filters/genre-exception.filter';
import { DeleteStoryByIdUseCase } from '../../application/use-cases/story-use-cases/delete-story-by-id.use-case';
import { UpdateStoryUseCase } from '../../application/use-cases/story-use-cases/update-story.use-case';
import { ToggleHiddenStoryUseCase } from '../../application/use-cases/story-use-cases/toggle-hidden-story.use-case';
import { UpdateStoryDto } from '../../application/dtos/story-dtos/update-story.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import viewConfig from 'src/config/view.config';
import { ConfigType } from '@nestjs/config';
import { FindAndFilterMyStoriesUseCase } from 'src/story/application/use-cases/story-use-cases/find-and-filter-my-stories.use-case';
import { FilterMyStoriesDto } from 'src/story/application/dtos/story-dtos/filter-my-stories.dto';
import { Response } from 'express';

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
    private toggleHiddenStoryUseCase: ToggleHiddenStoryUseCase,
    private findAndFilterMyStoriesUseCase: FindAndFilterMyStoriesUseCase,
    @Inject(viewConfig.KEY)
    private readonly viewEnvs: ConfigType<typeof viewConfig>,
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

    const viewUrl = this.viewEnvs.viewUrl;

    if (viewUrl) {
      const viewCreate = await fetch(viewUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: story.getId.getValue,
          title: story.getTitle.getValue,
          authorId: story.getUserId,
        }),
      });

      if (viewCreate.ok) {
        console.log('Se ha enviado correctamente la creación de la story');
      } else {
        console.log('No se ha podido enviar la creación de la story');
      }
    }

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

  @Get('search')
  async findAndFilterMultiple(
    @Query() filterMultipleStoryDto: FilterMultipleStoryDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { stories, meta } =
      await this.findAndFilterMultipleStoryUseCase.execute(
        filterMultipleStoryDto,
      );

    if (stories.length === 0) {
      return res.status(200).json({
        stories: stories,
        message: 'No se han encontrado historias con los filtros especificados',
      });
    }

    return {
      data: stories,
      meta,
    };
  }

  @Get('search/:userId')
  async findAndFilterMyStories(
    @Query() filterMyStoriesDto: FilterMyStoriesDto,
    @Param('userId') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { stories, meta } = await this.findAndFilterMyStoriesUseCase.execute(
      userId,
      filterMyStoriesDto,
    );

    if (stories.length === 0) {
      res.status(200).json({
        stories: stories,
        message: 'No se han encontrado historias con los filtros especificados',
      });
    }

    return {
      data: stories,
      meta,
    };
  }

  @Delete('delete/:id')
  async deleteStoryById(@Param('id') id: string) {
    const deletedStory = await this.deleteStoryByIdUseCase.execute(id);
    const viewUrl = this.viewEnvs.viewUrl;

    if (viewUrl) {
      const viewCreate = await fetch(`${viewUrl}/${deletedStory.id}`, {
        method: 'DELETE',
      });

      if (viewCreate.ok) {
        console.log('Se ha eliminado correctamente el tracking de view');
      } else {
        console.log(
          'no se ha podido eliminar de manera correcta en el view service',
        );
      }
    }

    return {
      message: `Se eliminó de manera exitosa la historia con id: ${deletedStory.id}`,
    };
  }

  @Put('update/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
    }),
  )
  async updateStory(
    @Param('id') id: string,
    @Body() updateStoryDto: UpdateStoryDto,
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

    return this.updateStoryUseCase.execute(id, updateStoryDto, uploadedFile);
  }

  @Patch('toggle-hidden/:id')
  async toggleHiddenStory(@Param('id') id: string) {
    const updatedStory = await this.toggleHiddenStoryUseCase.execute(id);
    return this.mapStoryToResponse(updatedStory);
  }

  private mapStoryToResponse = (story: Story) => {
    return {
      id: story.getId.getValue,
      title: story.getTitle.getValue,
      description: story.getDescription.getValue,
      hidden: story.getHidden,
      author: story.getUserId,
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
