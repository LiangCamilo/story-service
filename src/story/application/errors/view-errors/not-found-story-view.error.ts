import { ViewError } from './view.error';

export class StoryNotFoundViewError extends ViewError {
  constructor(
    status?: number,
    viewId?: string,
    userId?: string,
    storyId?: string,
  ) {
    super({
      message: `El usuario ya posee una vista en la historia de id ${storyId}`,
      type: 'story-error',
      viewId: viewId ?? '',
      storyId: storyId ?? '',
      userId: userId ?? '',
      status: status ?? 404,
    });
  }
}
