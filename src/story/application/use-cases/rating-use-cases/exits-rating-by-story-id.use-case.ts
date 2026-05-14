import { Inject, Injectable } from '@nestjs/common';
import {
  RATING_REPOSITORY,
  RatingRepositoryPort,
} from '../../ports/rating.repository';

@Injectable()
export class ExistsRatingByStoryIdUseCase {
  constructor(
    @Inject(RATING_REPOSITORY) private ratingRepository: RatingRepositoryPort,
  ) {}

  async execute() {}
}
