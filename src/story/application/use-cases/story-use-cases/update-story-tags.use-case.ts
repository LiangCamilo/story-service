import { Inject, Injectable } from '@nestjs/common';
import {
  STORY_REPOSITORY,
  StoryRepositoryPort,
} from '../../ports/story.repository';
import { TAG_REPOSITORY, TagRepositoryPort } from '../../ports/tag.repository';
import { UpdateStoryTagsDto } from '../../dtos/story-dtos/update-story-tags.dto';
import { StoryNotFoundError } from '../../errors/story-errors/story-not-found.error';
import { Tag } from '../../../domain/entities/tag.entity';

@Injectable()
export class UpdateStoryTagsUseCase {
  constructor(
    @Inject(STORY_REPOSITORY) private storyRepository: StoryRepositoryPort,
    @Inject(TAG_REPOSITORY) private tagRepository: TagRepositoryPort,
  ) {}

  async execute(storyId: string, dto: UpdateStoryTagsDto) {
    const existingStory = await this.storyRepository.findById(storyId);

    if (!existingStory) {
      throw new StoryNotFoundError(404, undefined, storyId);
    }
    const { tagNames } = dto;

    const existingTags = await this.tagRepository.findTagsByName(tagNames);
    const existingTagsName = existingTags.map((tag) => tag.getName.getValue);

    const notExistingTagNames = tagNames.filter((tagName) => {
      return !existingTagsName.includes(tagName);
    });

    const tagsToCreate = notExistingTagNames.map((name) =>
      Tag.create({ name }),
    );
    const newTags = await this.tagRepository.createMultipleTags(tagsToCreate);

    const allTags = [...existingTags, ...newTags];
    const allTagIds = allTags.map((tag) => tag.getId.getValue);

    await this.storyRepository.updateStoryTags(storyId, allTagIds);
  }
}
