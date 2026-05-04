import { Body, Controller, Param, Post, UseFilters } from '@nestjs/common';
import { CreateOrUpdateRatingDto } from 'src/story/application/dtos/rating-dtos/create-update-rating.dto';
import { CreateOrUpdateRatingUseCase } from 'src/story/application/use-cases/rating-use-cases/create-or-update-rating.use-case';

@Controller('api/rating')
@UseFilters()
export class RatingController {
  constructor(
    private createOrUpdateRatingUseCase: CreateOrUpdateRatingUseCase,
  ) {}

  @Post('/create/:userId/story/:storyId')
  async createView(
    @Param('userId') userId: string,
    @Param('storyId') storyId: string,
    @Body() createOrUpdateRatingDto: CreateOrUpdateRatingDto,
  ) {
    return await this.createOrUpdateRatingUseCase.execute(
      userId,
      storyId,
      createOrUpdateRatingDto,
    );
  }
}
