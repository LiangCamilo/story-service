import { AllowedStatus } from '../constants/story-constants/story-status.constants';
import { Id } from '../value-objects/id.vo';
import { StoryDescription } from '../value-objects/story-vo/story-description.vo';
import { StoryRatingCount } from '../value-objects/story-vo/story-rating-count.vo';
import { StoryRatingSum } from '../value-objects/story-vo/story-rating-sum.vo';
import { StoryTitle } from '../value-objects/story-vo/story-title.vo';
import { StoryTotalChapters } from '../value-objects/story-vo/story-total-chapters.vo';
import { StoryTotalFavorites } from '../value-objects/story-vo/story-total-favorites.vo';
import { StoryTotalRating } from '../value-objects/story-vo/story-total-rating.vo';
import { StoryTotalViews } from '../value-objects/story-vo/story-total-views.vo';

export class Story {
  constructor(
    private id: Id,
    private title: StoryTitle,
    private description: StoryDescription,
    private hidden: boolean = true,
    private userId: string,
    private userEmail: string,
    private genreId: string,
    private coverUrl: string = '',
    private tagIds: string[] = [],
    private totalRating?: StoryTotalRating,
    private ratingSum?: StoryRatingSum,
    private ratingCount?: StoryRatingCount,
    private totalChapters?: StoryTotalChapters,
    private totalViews?: StoryTotalViews,
    private totalFavorites?: StoryTotalFavorites,
    private secondaryGenreId?: string,
    private status?: AllowedStatus,
    private createdAt?: Date,
    private updatedAt?: Date,
  ) {}

  static create(params: {
    title: string;
    description: string;
    userId: string;
    userEmail: string;
    genreId: string;
    coverUrl?: string;
    secondaryGenreId?: string;
    tagIds?: string[];
    totalRating?: number;
    ratingSum?: number;
    ratingCount?: number;
    totalChapters?: number;
    totalViews?: number;
    totalFavorites?: number;
    id?: string;
    status?: AllowedStatus;
    createdAt?: Date;
    updatedAt?: Date;
  }): Story {
    return new Story(
      new Id(params.id),
      new StoryTitle(params.title),
      new StoryDescription(params.description),
      true,
      params.userId,
      params.userEmail,
      params.genreId,
      params.coverUrl ?? '',
      params.tagIds ? params.tagIds : [],
      new StoryTotalRating(params.totalRating),
      new StoryRatingSum(params.ratingSum),
      new StoryRatingCount(params.ratingCount),
      new StoryTotalChapters(params.totalChapters),
      new StoryTotalViews(params.totalViews ?? 0),
      new StoryTotalFavorites(params.totalFavorites ?? 0),
      params?.secondaryGenreId,
      params?.status,
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

  get getUserEmail(): string {
    return this.userEmail;
  }

  get getCoverUrl(): string {
    return this.coverUrl;
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

  get getTotalViews(): StoryTotalViews | undefined {
    return this.totalViews;
  }

  get getTotalFavorites(): StoryTotalFavorites | undefined {
    return this.totalFavorites;
  }

  get getStatus(): AllowedStatus | undefined {
    return this.status;
  }

  toPrimitives() {
    return {
      id: this.id.getValue,
      title: this.title.getValue,
      description: this.description.getValue,
      hidden: this.hidden,
      userId: this.userId,
      userEmail: this.userEmail,
      coverUrl: this.coverUrl,
      genreId: this.genreId,
      secondaryGenreId: this.secondaryGenreId ?? null,
      tagIds: this.tagIds,
      totalRating: this.totalRating?.getValue,
      totalChapters: this.totalChapters?.getValue,
      totalFavorites: this.totalFavorites?.getValue,
      ratingSum: this.ratingSum?.getValue,
      ratingCount: this.ratingCount?.getValue,
      createdAt: this.createdAt,
      updateAt: this.updatedAt,
    };
  }
}
