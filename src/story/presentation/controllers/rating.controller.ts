import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { CreateOrUpdateRatingDto } from 'src/story/application/dtos/rating-dtos/create-update-rating.dto';
import { ExistsRatingDto } from 'src/story/application/dtos/rating-dtos/exists-rating.dto';
import { CreateOrUpdateRatingUseCase } from 'src/story/application/use-cases/rating-use-cases/create-or-update-rating.use-case';
import { ExistsRatingByStoryIdUseCase } from 'src/story/application/use-cases/rating-use-cases/exists-rating-by-story-id.use-case';

@Controller('api/rating')
@UseFilters()
export class RatingController {
  constructor(
    private createOrUpdateRatingUseCase: CreateOrUpdateRatingUseCase,
    private existsRatingByStoryIdUseCase: ExistsRatingByStoryIdUseCase,
  ) {}

  @Post('/create')
  async createRating(@Body() createOrUpdateRatingDto: CreateOrUpdateRatingDto) {
    const newRating = await this.createOrUpdateRatingUseCase.execute(
      createOrUpdateRatingDto.userId,
      createOrUpdateRatingDto.storyId,
      createOrUpdateRatingDto,
    );

    return newRating?.toPrimitives();
  }

  @Get('/exists/:userId/story/:storyId')
  async existsRatingByStoryId(@Param() existsRatingDto: ExistsRatingDto) {
    const existsRating =
      await this.existsRatingByStoryIdUseCase.execute(existsRatingDto);

    if (!existsRating) {
      return {
        data: null,
      };
    }

    return {
      data: existsRating.toPrimitives(),
    };
  }
}
