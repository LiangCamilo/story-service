import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateStoryUseCase } from '../application/use-cases/story-use-cases/create-story.use-case';
import { CreateStoryDto } from '../application/dtos/story-dtos/create-story.dto';
import { Story } from '../domain/entities/story.entity';
import { FindStoryByTitleUseCase } from '../application/use-cases/story-use-cases/find-story-by-title.use-case';
import { FindStoryByIdUseCase } from '../application/use-cases/story-use-cases/find-story-by-id.use-case';

@Controller('api/story')
export class StoryController {
  constructor(
    private createStoryUseCase: CreateStoryUseCase,
    private findStoryByTitleUseCase: FindStoryByTitleUseCase,
    private findStoryByIdUseCase: FindStoryByIdUseCase,
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

  private mapStoryToResponse = (story: Story) => {
    return {
      id: story.getId.getValue,
      title: story.getTitle.getValue,
      description: story.getDescription.getValue,
      userId: story.getUserId,
      genreId: story.getGenreId,
      totalRating: story.getTotalRating?.getValue,
      totalChapters: story.getTotalChapters?.getValue,
      secondaryGenreId: story?.getSecondaryGenreId,
      createdAt: story.getCreatedAt?.getDate(),
      updatedAt: story.getUpdatedAt?.getDate(),
    };
  };
}
