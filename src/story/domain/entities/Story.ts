import { StoryDescription } from '../value-objects/story-vo/StoryDescription';
import { StoryRating } from '../value-objects/story-vo/StoryRating';
import { StoryTitle } from '../value-objects/story-vo/StoryTitle';
import { Chapter } from './Chapter';
import { Genre } from './Genre';
import { Tag } from './Tag';

export class Story {
  constructor(
    public id: string,
    public title: StoryTitle,
    public description: StoryDescription,
    public rating: StoryRating,
    public userId: string,
    public genreId: Genre,
    public chapters: Chapter[],
    public tags: Tag[],
    public subgenreId?: Genre,
  ) {}
}
