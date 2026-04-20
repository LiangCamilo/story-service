import { Inject, Injectable } from '@nestjs/common';
import {
  StoryRepositoryPort,
  STORY_REPOSITORY,
} from '../../ports/story.repository';
import { CreateStoryDto } from '../../dtos/story-dtos/create-story.dto';
import { TAG_REPOSITORY, TagRepositoryPort } from '../../ports/tag.repository';
import { StoryAlreadyExistsError } from '../../errors/story-errors/story-already-exists.error';
import { Tag } from 'src/story/domain/entities/tag.entity';
import { Id } from 'src/story/domain/value-objects/id.vo';
import { TagName } from 'src/story/domain/value-objects/tag-vo/tag-name.vo';
import { Story } from 'src/story/domain/entities/story.entity';

@Injectable()
export class CreateStoryUseCase {
  constructor(
    @Inject(STORY_REPOSITORY) private storyRepository: StoryRepositoryPort,
    @Inject(TAG_REPOSITORY) private tagRepository: TagRepositoryPort,
  ) {}

  async execute(dto: CreateStoryDto): Promise<Story> {
    let notExistingTags: Tag[] = [];
    let tagIds: string[] = [];
    let createdTags: Tag[] = [];

    const existingStory = await this.storyRepository.findByName(dto.title);

    if (existingStory) {
      throw new StoryAlreadyExistsError(existingStory.getTitle.getValue);
    }

    //Tags Creation Logic (By liang, this is not ChatGPT, I swear)
    const existingTags = await this.tagRepository.findTagsByName(dto.tagNames);

    console.log(`Deberia estar VACIO: ${JSON.stringify(existingTags)}`);

    if (existingTags.length !== 0) {
      const existingTagsIds = existingTags.map((tag) => {
        return tag.getId.getValue;
      });
      tagIds = [...tagIds, ...existingTagsIds];

      const notExistingRawTags = dto.tagNames.filter(
        (tagName) =>
          !existingTags.some((tag) => tag.getName.getValue === tagName),
      );

      if (notExistingRawTags.length !== 0) {
        notExistingTags = notExistingRawTags.map(
          (x) => new Tag(new Id(), new TagName(x)),
        );

        createdTags =
          await this.tagRepository.createMultipleTags(notExistingTags);

        const createdTagsIds = createdTags.map((tag) => {
          return tag.getId.getValue;
        });
        tagIds = [...tagIds, ...createdTagsIds];
      }
    }

    if (dto.tagNames.length !== 0) {
      notExistingTags = dto.tagNames.map(
        (x) => new Tag(new Id(), new TagName(x)),
      );

      createdTags =
        await this.tagRepository.createMultipleTags(notExistingTags);

      const createdTagsIds = createdTags.map((tag) => {
        return tag.getId.getValue;
      });
      tagIds = [...tagIds, ...createdTagsIds];
    }

    //Story Creation Logic (By liang, this is not ChatGPT, I swear)

    const story = Story.create({
      description: dto.description,
      genreId: dto.genreId,
      title: dto.title,
      userId: dto.userId,
      secondaryGenreId: dto.secondaryGenreId,
      tagIds,
    });

    const createdStory = await this.storyRepository.createStory(story);

    return createdStory;
  }
}
