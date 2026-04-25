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
import {
  GENRE_REPOSITORY,
  GenreRepositoryPort,
} from '../../ports/genre.repository';
import { capitalizeString } from 'src/utils/capitalize-string';
import { GenreNotFoundError } from '../../errors/genre-errors/genre-not-found.error';
import { Genre } from 'src/story/domain/entities/genre.entity';

@Injectable()
export class CreateStoryUseCase {
  constructor(
    @Inject(STORY_REPOSITORY) private storyRepository: StoryRepositoryPort,
    @Inject(TAG_REPOSITORY) private tagRepository: TagRepositoryPort,
    @Inject(GENRE_REPOSITORY) private genreRepository: GenreRepositoryPort,
  ) {}

  async execute(dto: CreateStoryDto): Promise<Story> {
    let notExistingTags: Tag[] = [];
    let tagIds: string[] = [];
    let createdTags: Tag[] = [];
    let secondaryGenre: Genre | undefined = undefined;

    const existingStory = await this.storyRepository.findByTitle(dto.title);

    if (existingStory) {
      throw new StoryAlreadyExistsError(existingStory.getTitle.getValue);
    }

    //Tags Creation Logic (By liang, this is not ChatGPT, I swear)

    if (dto.tagNames) {
      //Busquemos primero los tags existentes
      const existingTags = await this.tagRepository.findTagsByName(
        dto.tagNames,
      );

      //Si los hay tags en los tagName que existen, entonces entra al if
      if (existingTags.length !== 0) {
        //Sacame el id de los tags que ya existen
        const existingTagsIds = existingTags.map((tag) => {
          return tag.getId.getValue;
        });
        tagIds = [...tagIds, ...existingTagsIds];

        //Sacame el nombre de los tags que no existen
        const notExistingRawTags = dto.tagNames.filter(
          (tagName) =>
            !existingTags.some((tag) => tag.getName.getValue === tagName),
        );

        //Si no existe algún tag, entonces CREALO
        if (notExistingRawTags.length !== 0) {
          notExistingTags = notExistingRawTags.map(
            (x) => new Tag(new Id(), new TagName(x)),
          );

          createdTags =
            await this.tagRepository.createMultipleTags(notExistingTags);

          const createdTagsIds = createdTags.map((tag) => {
            return tag.getId.getValue;
          });

          //Añademe el id de los tags recien creados a mi lista de ids
          tagIds = [...tagIds, ...createdTagsIds];
        }
      }
    }

    //Getting Genre
    const formattedGenreName = capitalizeString(dto.genreName) ?? '';

    const genre =
      await this.genreRepository.findGenreByName(formattedGenreName);

    if (!genre) {
      throw new GenreNotFoundError(formattedGenreName);
    }

    //Getting Secondary Genre
    if (dto.secondaryGenreName) {
      const formattedSecondaryGenreName =
        capitalizeString(dto.secondaryGenreName) ?? '';

      secondaryGenre = await this.genreRepository.findGenreByName(
        formattedSecondaryGenreName,
      );

      if (!secondaryGenre) {
        throw new GenreNotFoundError(formattedSecondaryGenreName);
      }
    }

    //Story Creation Logic (By liang, this is not ChatGPT, I swear)

    const story = Story.create({
      title: dto.title,
      description: dto.description,
      userId: dto.userId,
      genreId: genre.getId.getValue,
      secondaryGenreId: secondaryGenre
        ? secondaryGenre.getId.getValue
        : undefined,
      tagIds,
    });

    const createdStory = await this.storyRepository.createStory(story);

    return createdStory;
  }
}
