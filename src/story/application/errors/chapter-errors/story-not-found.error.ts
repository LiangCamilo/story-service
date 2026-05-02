import { ChapterError } from './chapter.error';

export class ChapterNotFoundError extends ChapterError {
  constructor(
    status?: number,
    title?: string,
    chapterId?: string,
    storyId?: string,
  ) {
    super({
      message: `El capitulo solicitado no fue encontrado`,
      storyId,
      chapterId,
      title,
      status,
    });
  }
}
