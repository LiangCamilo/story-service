import { Inject, Injectable } from '@nestjs/common';
import {
  RATING_REPOSITORY,
  RatingRepositoryPort,
} from '../../ports/rating.repository';
import { ExistsRatingDto } from '../../dtos/rating-dtos/exists-rating.dto';

@Injectable()
export class ExistsRatingByStoryIdUseCase {
  constructor(
    @Inject(RATING_REPOSITORY) private ratingRepository: RatingRepositoryPort,
  ) {}

  async execute(existsRatingDto: ExistsRatingDto) {
    const { storyId, userId } = existsRatingDto;

    const existsRating = await this.ratingRepository.findRatingByStoryAndUserId(
      storyId,
      userId,
    );

    if (!existsRating) {
      return null;
    }

    return existsRating;
  }
}
