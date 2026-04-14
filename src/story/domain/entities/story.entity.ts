import { StoryDescription } from '../value-objects/story-vo/story-description.vo';
import { StoryTitle } from '../value-objects/story-vo/story-title.vo';
import { Chapter } from './chapter.entity';
import { Rating } from './rating.entity';
import { Tag } from './tag.entity';

export class Story {
  constructor(
    public id: string,
    public title: StoryTitle,
    public description: StoryDescription,
    public ratings: Rating[] = [],
    public userId: string,
    public genreId: string,
    public chapters: Chapter[] = [],
    public tags: Tag[] = [],
    public subgenreId?: string,
  ) {}
}
