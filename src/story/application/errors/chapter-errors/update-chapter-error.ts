import { ChapterError } from './chapter.error';

export class UpdateChapterError extends ChapterError {
  constructor(
    status?: number,
    title?: string,
    chapterId?: string,
    storyId?: string,
  ) {
    super({
      message: `El capitulo no se pudo actualizar porque no pudo ser encontrado`,
      storyId,
      chapterId,
      title,
      status,
    });
  }
}
