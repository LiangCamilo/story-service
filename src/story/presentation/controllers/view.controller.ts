import { Controller, Param, Post } from '@nestjs/common';
import { CreateViewUseCase } from 'src/story/application/use-cases/view-use-cases/create-view.use-case';

@Controller('api/view')
export class ViewController {
  constructor(private createViewUseCase: CreateViewUseCase) {}

  @Post(':userId/story/:storyId')
  async createView(
    @Param('userId') userId: string,
    @Param('storyId') storyId: string,
  ) {
    const newView = await this.createViewUseCase.execute(storyId, userId);

    return newView;
  }
}
