import { Inject, Injectable } from '@nestjs/common';
import {
  RATING_REPOSITORY,
  RatingRepositoryPort,
} from '../../ports/rating.repository';
import { CreateOrUpdateRatingDto } from '../../dtos/rating-dtos/create-update-rating.dto';
import { RatingError } from '../../errors/rating-errors/rating.error';

@Injectable()
export class CreateOrUpdateRatingUseCase {
  constructor(
    @Inject(RATING_REPOSITORY) private ratingRepository: RatingRepositoryPort,
  ) {}

  async execute(
    userId: string,
    storyId: string,
    createOrUpdateRatingDto: CreateOrUpdateRatingDto,
  ) {
    try {
      const { score } = createOrUpdateRatingDto;
      if (score) {
        return await this.ratingRepository.createOrUpdateRating(
          storyId,
          userId,
          score,
        );
      }
    } catch {
      throw new RatingError({
        message: 'Failed to create or update rating',
        storyId,
        userId,
        status: 500,
      });
    }
  }
}
