import { Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateFavoriteStoryDto } from 'src/story/application/dtos/favorite-story-dtos/create-favorite-story.dto';

@Controller()
export class FavoriteStoryController {
  constructor() {}

  @Delete()
  async deleteStoryFromFavorite() {}

  @Post()
  async addFavorite(createFavoriteStoryDto: CreateFavoriteStoryDto) {
    return;
  }

  @Get()
  async getFavorites() {}
}
