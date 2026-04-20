import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateStoryUseCase } from '../application/use-cases/story-use-cases/create-story.use-case';
import { CreateStoryDto } from '../application/dtos/story-dtos/create-story.dto';
import { Story } from '../domain/entities/story.entity';

@Controller('api/story')
export class StoryController {
  constructor(private createStoryUseCase: CreateStoryUseCase) {}

  @Post('create')
  @HttpCode(201)
  async createStory(@Body() request: CreateStoryDto) {
    console.log(request);
    const story = await this.createStoryUseCase.execute(request);
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
