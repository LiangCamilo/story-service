import { StoryDescription } from '../value-objects/story-vo/story-description.vo';
import { StoryTitle } from '../value-objects/story-vo/story-title.vo';
import { Chapter } from './chapter.entity';
import { Rating } from './rating.entity';
import { Tag } from './tag.entity';

export class Story {
  constructor(
    private id: string,
    private title: StoryTitle,
    private description: StoryDescription,
    private ratings: Rating[] = [],
    private userId: string,
    private genreId: string,
    private chapters: Chapter[] = [],
    private tags: Tag[] = [],
    private subgenreId?: string,
  ) {}
}
