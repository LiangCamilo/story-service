import { Inject, Injectable } from '@nestjs/common';
import {
  StoryRepositoryPort,
  STORY_REPOSITORY,
  UpdateStoryData,
} from '../../ports/story.repository';
import {
  GENRE_REPOSITORY,
  GenreRepositoryPort,
} from '../../ports/genre.repository';
import { UpdateStoryDto } from '../../dtos/story-dtos/update-story.dto';
import { StoryNotFoundError } from '../../errors/story-errors/story-not-found.error';
import { GenreNotFoundError } from '../../errors/genre-errors/genre-not-found.error';
import { capitalizeString } from 'src/utils/capitalize-string';
import { StoryWithDetails } from '../../read-models/story-with-details.read-model';
import { StoryAlreadyExistsError } from '../../errors/story-errors/story-already-exists.error';

@Injectable()
export class UpdateStoryUseCase {
  constructor(
    @Inject(STORY_REPOSITORY) private storyRepository: StoryRepositoryPort,
    @Inject(GENRE_REPOSITORY) private genreRepository: GenreRepositoryPort,
  ) {}

  async execute(id: string, dto: UpdateStoryDto): Promise<StoryWithDetails> {
    const existingStory = await this.storyRepository.findById(id);

    if (!existingStory) {
      throw new StoryNotFoundError(404, undefined, id);
    }

    if (dto.title && dto.title !== existingStory.title) {
      const storyWithSameTitle = await this.storyRepository.findByTitle(
        dto.title,
      );
      if (storyWithSameTitle) {
        throw new StoryAlreadyExistsError(dto.title);
      }
    }

    const updateData: UpdateStoryData = {
      title: dto.title,
      description: dto.description,
      status: dto.status,
    };

    if (dto.genreName) {
      const formattedGenreName = capitalizeString(dto.genreName) ?? '';
      const genre =
        await this.genreRepository.findGenreByName(formattedGenreName);

      if (!genre) {
        throw new GenreNotFoundError(formattedGenreName, 404);
      }
      updateData.genreId = genre.getId.getValue;
    }

    if (dto.secondaryGenreName) {
      const formattedSecondaryGenreName =
        capitalizeString(dto.secondaryGenreName) ?? '';
      const secondaryGenre = await this.genreRepository.findGenreByName(
        formattedSecondaryGenreName,
      );

      if (!secondaryGenre) {
        throw new GenreNotFoundError(formattedSecondaryGenreName, 404);
      }
      updateData.secondaryGenreId = secondaryGenre.getId.getValue;
    }

    return await this.storyRepository.updateStory(id, updateData);
  }
}
