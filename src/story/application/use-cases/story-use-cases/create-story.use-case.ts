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
import { UploadedCoverDto } from '../../dtos/story-dtos/uploaded-cover.dto';
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';

@Injectable()
export class CreateStoryUseCase {
  constructor(
    @Inject(STORY_REPOSITORY) private storyRepository: StoryRepositoryPort,
    @Inject(TAG_REPOSITORY) private tagRepository: TagRepositoryPort,
    @Inject(GENRE_REPOSITORY) private genreRepository: GenreRepositoryPort,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async execute(dto: CreateStoryDto, cover?: UploadedCoverDto): Promise<Story> {
    const tagIds: string[] = [];
    let secondaryGenre: Genre | undefined = undefined;

    const existingStory = await this.storyRepository.findByTitle(dto.title);

    if (existingStory) {
      throw new StoryAlreadyExistsError(existingStory.title);
    }

    if (dto.tagNames && dto.tagNames.length > 0) {
      // 1. Buscamos los que existen
      const existingTags = await this.tagRepository.findTagsByName(
        dto.tagNames,
      );

      // 2. Extraemos IDs de los existentes (si no hay, arranca vacío)
      tagIds.push(...existingTags.map((tag) => tag.getId.getValue));

      // 3. Calculamos cuáles faltan por crear
      const existingNames = existingTags.map((tag) => tag.getName.getValue);
      const notExistingRawTags = dto.tagNames.filter(
        (name) => !existingNames.includes(name),
      );

      // 4. Si faltan algunos, los creamos incondicionalmente
      if (notExistingRawTags.length > 0) {
        const newTags = notExistingRawTags.map(
          (name) => new Tag(new Id(), new TagName(name)),
        );
        const createdTags =
          await this.tagRepository.createMultipleTags(newTags);

        tagIds.push(...createdTags.map((tag) => tag.getId.getValue));
      }
    }

    //Getting Genre
    const formattedGenreName = capitalizeString(dto.genreName) ?? '';

    const genre =
      await this.genreRepository.findGenreByName(formattedGenreName);

    if (!genre) {
      throw new GenreNotFoundError(formattedGenreName, 404);
    }

    //Getting Secondary Genre
    if (dto.secondaryGenreName) {
      const formattedSecondaryGenreName =
        capitalizeString(dto.secondaryGenreName) ?? '';

      secondaryGenre = await this.genreRepository.findGenreByName(
        formattedSecondaryGenreName,
      );

      if (!secondaryGenre) {
        throw new GenreNotFoundError(formattedSecondaryGenreName, 404);
      }
    }

    //Story Creation Logic (By liang, this is not ChatGPT, I swear)

    let coverUrl: string | undefined = undefined;

    if (cover) {
      const uploadResult: any =
        await this.cloudinaryService.uploadImageToCloudinary(cover);
      coverUrl = uploadResult.secure_url;
    }

    const story = Story.create({
      title: dto.title,
      description: dto.description,
      userId: dto.userId,
      userEmail: dto.userEmail,
      genreId: genre.getId.getValue,
      coverUrl: coverUrl,
      secondaryGenreId: secondaryGenre
        ? secondaryGenre.getId.getValue
        : undefined,
      tagIds,
    });

    const createdStory = await this.storyRepository.createStory(story);

    return createdStory;
  }
}
