import { Injectable } from '@nestjs/common';
import { FavoriteStoryRepositoryPort } from 'src/story/application/ports/favorite-story.repository';
import { FavoriteStory } from 'src/story/domain/entities/favorite-story.entity';

@Injectable()
export class PrismaStoryFavoriteRepository {}

@Injectable()
export class PrismaFavoriteStoryRepository implements FavoriteStoryRepositoryPort {
  create(): Promise<FavoriteStory | undefined> {}

  findFavoriteStories(userId: string): Promise<FavoriteStory[] | undefined> {}
}
