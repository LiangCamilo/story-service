import { Inject } from '@nestjs/common';
import {
  VIEW_REPOSITORY,
  ViewRepositoryPort,
} from '../../ports/view.repository';

export class CreateViewUseCase {
  constructor(
    @Inject(VIEW_REPOSITORY) private viewRepository: ViewRepositoryPort,
  ) {}

  async execute(storyId: string, viewId: string) {
    return this.viewRepository.createView(storyId, viewId);
  }
}
