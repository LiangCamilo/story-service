import { Inject, Injectable } from '@nestjs/common';
import {
  StoryRepositoryPort,
  STORY_REPOSITORY,
} from '../../ports/story.repository';
import { StoryNotFoundError } from '../../errors/story-errors/story-not-found.error';
import { StoryCoverNotFoundError } from '../../errors/story-errors/story-cover-not-found.error';
import { StoryWithDetails } from '../../read-models/story-with-details.read-model';
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';

@Injectable()
export class RemoveStoryCoverUseCase {
  constructor(
    @Inject(STORY_REPOSITORY) private storyRepository: StoryRepositoryPort,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async execute(id: string): Promise<StoryWithDetails> {
    const existingStory = await this.storyRepository.findById(id);

    if (!existingStory) {
      throw new StoryNotFoundError(404, undefined, id);
    }

    if (!existingStory.coverUrl) {
      throw new StoryCoverNotFoundError();
    }

    const publicId = existingStory.coverUrl.split('/').pop()?.split('.')[0];
    if (publicId) {
      await this.cloudinaryService.deleteFromCloudinary(publicId);
    }

    return await this.storyRepository.updateCoverUrl(id, '');
  }
}
