import { View } from 'src/story/domain/entities/view.entity';

export interface ViewRepositoryPort {
  createView(storyId: string, userId: string): Promise<View | undefined>;
}

export const VIEW_REPOSITORY = Symbol('VIEW_REPOSITORY');
