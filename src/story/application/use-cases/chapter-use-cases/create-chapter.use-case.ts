import { Inject, Injectable } from '@nestjs/common';
import {
  CHAPTER_REPOSITORY,
  ChapterRepositoryPort,
} from '../../ports/chapter.repository';
import { CreateChapterDto } from '../../dtos/chapter-dtos/create-chapter.dto';
import { Chapter } from 'src/story/domain/entities/chapter.entity';
import { StoryNotFoundChapterError } from '../../errors/chapter-errors/story-not-found-chapter.error';

@Injectable()
export class CreateChapterUseCase {
  constructor(
    @Inject(CHAPTER_REPOSITORY)
    private chapterRepository: ChapterRepositoryPort,
  ) {}

  async execute(createChapterDto: CreateChapterDto) {
    const newChapter = await this.chapterRepository.create(
      Chapter.create({
        title: 'titulo vacio',
        content: '',
        order: 1,
        storyId: createChapterDto.storyId,
      }),
    );

    if (!newChapter) {
      throw new StoryNotFoundChapterError(
        404,
        undefined,
        undefined,
        createChapterDto.storyId,
      );
    }

    return newChapter;
  }
}
