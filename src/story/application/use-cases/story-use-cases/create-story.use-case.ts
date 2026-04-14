import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  StoryRepositoryPort,
  STORY_REPOSITORY,
} from '../../ports/story.repository';
import { CreateStoryDto } from '../../dtos/story-dtos/create-story.dto';
import { Story } from 'src/generated/prisma/client';
import { TAG_REPOSITORY, TagRepositoryPort } from '../../ports/tag.repository';

@Injectable()
export class CreateStoryUseCase {
  constructor(
    @Inject(STORY_REPOSITORY) private storyRepository: StoryRepositoryPort,
    @Inject(TAG_REPOSITORY) private tagRepository: TagRepositoryPort,
  ) {}

  async execute(dto: CreateStoryDto): Promise<Story> {
    const existingStory = await this.storyRepository.findByName(dto.title);

    if (existingStory) {
      throw new HttpException(
        `La historia de nombre "${dto.title}" ya existe, ingrese otro nombre`,
        HttpStatus.BAD_GATEWAY,
      );
    }

    const tags = dto.tagNames;
    let tagsForCreation = [];
    tags.map(x => {
      
    })
  }
}
