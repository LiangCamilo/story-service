import { ChapterError } from './chapter.error';

export class DeleteChapterError extends ChapterError {
  constructor(
    status?: number,
    title?: string,
    chapterId?: string,
    storyId?: string,
  ) {
    super({
      message: `El capitulo a borrar no fue encontrado`,
      storyId,
      chapterId,
      title,
      status,
    });
  }
}
