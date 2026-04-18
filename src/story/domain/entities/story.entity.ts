import { Id } from '../value-objects/id.vo';
import { StoryDescription } from '../value-objects/story-vo/story-description.vo';
import { StoryTitle } from '../value-objects/story-vo/story-title.vo';
import { Chapter } from './chapter.entity';

export class Story {
  constructor(
    private id: Id,
    private title: StoryTitle,
    private description: StoryDescription,
    private hidden: boolean = true,
    private userId: string,
    private genreId: string,
    private chapters: Chapter[] = [],
    private tagIds: string[] = [],
    private secondaryGenreId?: string,
    private createdAt?: Date,
    private updatedAt?: Date,
  ) {}

  static create(params: {
    title: string;
    description: string;
    userId: string;
    genreId: string;
    secondaryGenreId?: string;
    tagIds?: string[];
  }): Story {
    return new Story(
      new Id(),
      new StoryTitle(params.title),
      new StoryDescription(params.description),
      true,
      params.userId,
      params.genreId,
      [], // chapters
      params.tagIds ? params.tagIds : [],
      params?.secondaryGenreId,
    );
  }

  addChapter(chapter: Chapter) {
    this.chapters = [...this.chapters, chapter];
  }

  get getId(): Id {
    return this.id;
  }

  get getTitle(): StoryTitle {
    return this.title;
  }

  get getDescription(): StoryDescription {
    return this.description;
  }

  get getHidden(): boolean {
    return this.hidden;
  }

  get getUserId(): string {
    return this.userId;
  }

  get getGenreId(): string {
    return this.genreId;
  }

  get getSecondaryGenreId(): string | undefined {
    return this.secondaryGenreId;
  }

  get getTagIds(): string[] {
    return this.tagIds;
  }

  get getCreatedAt(): Date | undefined {
    return this.createdAt;
  }

  get getUpdatedAt(): Date | undefined {
    return this.updatedAt;
  }

  toPrimitives() {
    return {
      id: this.id.getValue,
      title: this.title.getValue,
      description: this.description.getValue,
      hidden: this.hidden,
      userId: this.userId,
      genreId: this.genreId,
      secondaryGenreId: this.secondaryGenreId ?? null,
      tagIds: this.tagIds,
    };
  }
}
