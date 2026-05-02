import { ChapterError } from './chapter.error';

export class StoryNotFoundChapterError extends ChapterError {
  constructor(
    status?: number,
    title?: string,
    chapterId?: string,
    storyId?: string,
  ) {
    super({
      message: `No se pudo encontrar la historia para la que se desea crear el capitulo`,
      storyId,
      chapterId,
      title,
      status,
    });
  }
}
