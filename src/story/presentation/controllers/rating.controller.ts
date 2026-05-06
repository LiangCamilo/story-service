import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CreateOrUpdateRatingDto } from 'src/story/application/dtos/rating-dtos/create-update-rating.dto';
import { CreateOrUpdateRatingUseCase } from 'src/story/application/use-cases/rating-use-cases/create-or-update-rating.use-case';

@Controller('api/rating')
@UseFilters()
export class RatingController {
  constructor(
    private createOrUpdateRatingUseCase: CreateOrUpdateRatingUseCase,
  ) {}

  @Post('/create')
  async createView(@Body() createOrUpdateRatingDto: CreateOrUpdateRatingDto) {
    return await this.createOrUpdateRatingUseCase.execute(
      createOrUpdateRatingDto.userId,
      createOrUpdateRatingDto.storyId,
      createOrUpdateRatingDto,
    );
  }
}
