import { Inject, Injectable } from '@nestjs/common';
import {
  StoryRepositoryPort,
  STORY_REPOSITORY,
} from '../../ports/story.repository';
import { StoryNotFoundError } from '../../errors/story-errors/story-not-found.error';
import { StoryWithDetails } from '../../read-models/story-with-details.read-model';
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';
import { UploadedCoverDto } from '../../dtos/story-dtos/uploaded-cover.dto';
import { StoryError } from '../../errors/story-errors/story.error';

@Injectable()
export class UpdateStoryCoverUseCase {
  constructor(
    @Inject(STORY_REPOSITORY) private storyRepository: StoryRepositoryPort,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async execute(
    id: string,
    cover: UploadedCoverDto,
  ): Promise<StoryWithDetails> {
    if (!cover) {
      throw new StoryError({
        message: 'No se proporcionó ninguna imagen',
        status: 400,
      });
    }

    const existingStory = await this.storyRepository.findById(id);

    if (!existingStory) {
      throw new StoryNotFoundError(404, undefined, id);
    }

    let publicId: string | undefined = undefined;
    if (existingStory.coverUrl) {
      publicId = existingStory.coverUrl.split('/').pop()?.split('.')[0];
    }

    const uploadResult: any =
      await this.cloudinaryService.uploadImageToCloudinary(cover, publicId);

    return await this.storyRepository.updateCoverUrl(
      id,
      uploadResult.secure_url,
    );
  }
}
