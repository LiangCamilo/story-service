import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { AllowedStatus } from 'src/story/domain/constants/story-constants/story-status.constants';

export class FilterMultipleStoryDto {
  @IsString()
  @MaxLength(120)
  @IsOptional()
  title?: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  genreId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  secondaryGenreId?: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  totalRating?: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  totalViews?: boolean;

  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(999999)
  @Type(() => Number)
  totalChapters?: number;

  @IsOptional()
  @IsString()
  status?: AllowedStatus;
}
