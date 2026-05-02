import { Inject, Injectable } from '@nestjs/common';
import {
  STORY_REPOSITORY,
  StoryRepositoryPort,
} from '../../ports/story.repository';
import { StoryNotFoundError } from '../../errors/story-errors/story-not-found.error';
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';
@Injectable()
export class DeleteStoryByIdUseCase {
  constructor(
    @Inject(STORY_REPOSITORY) private storyRepository: StoryRepositoryPort,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async execute(id: string) {
    const story = await this.storyRepository.findById(id);

    if (!story) {
      throw new StoryNotFoundError(404, undefined, id);
    }

    if (story.coverUrl) {
      try {
        const publicId = story.coverUrl.split('/').pop()?.split('.')[0];
        if (publicId) {
          await this.cloudinaryService.deleteFromCloudinary(publicId);
        }
      } catch (error) {
        console.error(`Failed to delete cover image for story ${id}:`, error);
      }
    }

    await this.storyRepository.deleteStoryById(id);

    return story;
  }
}
