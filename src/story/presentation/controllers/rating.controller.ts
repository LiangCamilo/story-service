import { Controller, Param, Post, UseFilters } from '@nestjs/common';

@Controller('api/rating')
@UseFilters()
export class RatingController {
  constructor() {}

  @Post('/create/:userId/story/:storyId')
  async createView(
    @Param('userId') userId: string,
    @Param('storyId') storyId: string,
  ) {}
}
