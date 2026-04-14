import { StoryDescription } from '../value-objects/story-vo/story-description.vo';
import { StoryId } from '../value-objects/story-vo/story-id.vo';
import { StoryTitle } from '../value-objects/story-vo/story-title.vo';
import { Chapter } from './chapter.entity';
import { Rating } from './rating.entity';

export class Story {
  constructor(
    private id: StoryId,
    private title: StoryTitle,
    private description: StoryDescription,
    private hidden: boolean = true,
    private userId: string,
    private genreId: string,
    private chapters: Chapter[] = [],
    private tagIds: string[] = [],
    private subgenreId?: string,
  ) {}

  static create(params: {
    title: string;
    description: string;
    hidden: boolean;
    userId: string;
    genreId: string;
    subgenreId?: string;
    tagIds?: string[];
  }): Story {
    return new Story(
      new StoryId(),
      new StoryTitle(params.title),
      new StoryDescription(params.description),
      params.hidden,
      params.userId,
      params.genreId,
      [], // chapters
      params.tagIds,
      params.subgenreId,
    );
  }
}
