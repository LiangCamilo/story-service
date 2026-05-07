import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateFavoriteStoryDto } from 'src/story/application/dtos/favorite-story-dtos/create-favorite-story.dto';
import { AddFavoriteStoryUseCase } from 'src/story/application/use-cases/favorite-story-use-cases/add-favorite-story.use-case';
import { FindAllFavoriteStoriesByUserIdUseCase } from 'src/story/application/use-cases/favorite-story-use-cases/find-all-favorite-stories-by-user-id.use-case';

@Controller('favorite')
export class FavoriteStoryController {
  constructor(
    private addFavoriteStoryUseCase: AddFavoriteStoryUseCase,
    private findAllFavoriteStoriesByUserIdUseCase: FindAllFavoriteStoriesByUserIdUseCase,
  ) {}

  @Delete()
  async deleteStoryFromFavorite() {}

  @Post()
  async addFavorite(createFavoriteStoryDto: CreateFavoriteStoryDto) {
    const addedStoryToFavorite = await this.addFavoriteStoryUseCase.execute(
      createFavoriteStoryDto,
    );

    return addedStoryToFavorite;
  }

  @Get(':userId')
  async getFavorites(@Param('userId') id: string) {
    return await this.findAllFavoriteStoriesByUserIdUseCase.execute(id);
  }

  @Post('filter')
  async filterFavorites() {
    return;
  }
}
