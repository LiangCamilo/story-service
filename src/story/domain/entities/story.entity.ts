import { Id } from '../value-objects/id.vo';
import { StoryDescription } from '../value-objects/story-vo/story-description.vo';
import { StoryTitle } from '../value-objects/story-vo/story-title.vo';
import { StoryTotalChapters } from '../value-objects/story-vo/story-total-chapters.vo';
import { StoryTotalRating } from '../value-objects/story-vo/story-total-rating.vo';
import { StoryTotalViews } from '../value-objects/story-vo/story-total-views.vo';

export class Story {
  constructor(
    private id: Id,
    private title: StoryTitle,
    private description: StoryDescription,
    private hidden: boolean = true,
    private userId: string,
    private genreId: string,
    private tagIds: string[] = [],
    private totalRating?: StoryTotalRating,
    private totalChapters?: StoryTotalChapters,
    private totalViews?: StoryTotalViews,
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
    totalRating?: number;
    totalChapters?: number;
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): Story {
    return new Story(
      new Id(params.id),
      new StoryTitle(params.title),
      new StoryDescription(params.description),
      true,
      params.userId,
      params.genreId,
      params.tagIds ? params.tagIds : [],
      new StoryTotalRating(params.totalRating),
      new StoryTotalChapters(params.totalChapters),
      new StoryTotalViews(0),
      params?.secondaryGenreId,
      params.createdAt,
      params.updatedAt,
    );
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

  get getTotalRating(): StoryTotalRating | undefined {
    return this.totalRating;
  }

  get getTotalChapters(): StoryTotalChapters | undefined {
    return this.totalChapters;
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
      totalRating: this.totalRating?.getValue,
      totalChapters: this.totalChapters?.getValue,
      createdAt: this.createdAt,
      updateAt: this.updatedAt,
    };
  }
}
