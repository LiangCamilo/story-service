import { Controller, Inject, Param, Post, UseFilters } from '@nestjs/common';
import { CreateViewUseCase } from 'src/story/application/use-cases/view-use-cases/create-view.use-case';
import { ViewExceptionFilter } from '../filters/view-exception.filter';
import viewConfig from 'src/config/view.config';
import { ConfigType } from '@nestjs/config';

@Controller('api/view')
@UseFilters(ViewExceptionFilter)
export class ViewController {
  constructor(
    private createViewUseCase: CreateViewUseCase,
    @Inject(viewConfig.KEY)
    private readonly viewEnvs: ConfigType<typeof viewConfig>,
  ) {}

  @Post(':userId/story/:storyId')
  async createView(
    @Param('userId') userId: string,
    @Param('storyId') storyId: string,
  ) {
    const newView = await this.createViewUseCase.execute(storyId, userId);

    const viewUrl = this.viewEnvs.viewUrl;

    if (viewUrl) {
      const viewCreate = await fetch(
        `${viewUrl}/counter/${newView?.getStoryId}`,
        {
          method: 'PATCH',
        },
      );

      if (viewCreate.ok) {
        console.log('Se ha enviado correctamente la creación de la story');
      } else {
        console.log('No se ha podido enviar la creación de la story');
      }
    }
    return newView;
  }
}
