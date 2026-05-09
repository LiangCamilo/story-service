import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  UseFilters,
} from '@nestjs/common';
import { CreateFavoriteStoryDto } from 'src/story/application/dtos/favorite-story-dtos/create-favorite-story.dto';
import { FilterFavoriteStoriesDto } from 'src/story/application/dtos/favorite-story-dtos/filter-favorite-stories.dto';
import { AddFavoriteStoryUseCase } from 'src/story/application/use-cases/favorite-story-use-cases/add-favorite-story.use-case';
import { FilterOwnFavoriteStoriesUseCase } from 'src/story/application/use-cases/favorite-story-use-cases/filter-own-favorite-stories.use-case';
import { FavoriteStoryExceptionFilter } from '../filters/favorite-story-exception.filter';
import { Response } from 'express';
import { RemoveStoryFromFavoriteDto } from 'src/story/application/dtos/favorite-story-dtos/remove-story-from-favorite.dto';
import { RemoveStoryFromFavoriteUseCase } from 'src/story/application/use-cases/favorite-story-use-cases/remove-story-from-favorite.use-case';
@Controller('api/favorite')
@UseFilters(FavoriteStoryExceptionFilter)
export class FavoriteStoryController {
  constructor(
    private addFavoriteStoryUseCase: AddFavoriteStoryUseCase,
    private filterOwnFavoriteStoriesUseCase: FilterOwnFavoriteStoriesUseCase,
    private removeStoryFromFavoriteUseCase: RemoveStoryFromFavoriteUseCase,
  ) {}

  @Delete()
  async deleteStoryFromFavorite() {}

  @Post('add')
  async addFavorite(@Body() createFavoriteStoryDto: CreateFavoriteStoryDto) {
    const addedStoryToFavorite = await this.addFavoriteStoryUseCase.execute(
      createFavoriteStoryDto,
    );

    return {
      message: `Se ha añadido a favoritos la historia ${addedStoryToFavorite.getStory?.getTitle.getValue}`,
    };
  }

  @Get('search/:userId')
  async filterFavorites(
    @Param('userId') userId: string,
    @Query() filterFavoriteStoriesDto: FilterFavoriteStoriesDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const favoriteStoriesFiltered =
      await this.filterOwnFavoriteStoriesUseCase.execute(
        userId,
        filterFavoriteStoriesDto,
      );

    if (favoriteStoriesFiltered.filteredFavoriteStories.length === 0) {
      return res.status(200).json({
        stories: favoriteStoriesFiltered.filteredFavoriteStories,
        message: 'No se han encontrado historias con los filtros especificados',
      });
    }

    return {
      stories: favoriteStoriesFiltered.filteredFavoriteStories,
      meta: favoriteStoriesFiltered.meta,
    };
  }

  @Delete('remove/:userId/:storyId')
  async removeStoryFromFavorite(
    @Param() removeStoryFromFavoriteDto: RemoveStoryFromFavoriteDto,
  ) {
    const removedStoryFromFavorite =
      await this.removeStoryFromFavoriteUseCase.execute(
        removeStoryFromFavoriteDto,
      );

    return {
      message: `Se ha removido de favoritos la historia ${removedStoryFromFavorite.getStory?.getTitle.getValue}`,
    };
  }
}
