import { IsString, Max, Min } from 'class-validator';

export class FilterMultipleStoryDto {
  @IsString()
  @Max(120)
  title!: string;

  @IsString()
  @Max(50)
  genreName!: string;

  @IsString()
  @Max(50)
  secondaryGenreName!: string;

  @IsString()
  @Max(10)
  @Min(0)
  totalRating!: number;

  @IsString()
  @Min(1)
  @Max(999999)
  totalChapters!: number;

  @IsString()
  status!: string;
}
