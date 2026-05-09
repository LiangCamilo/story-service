import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';
import { AllowedStatus } from 'src/story/domain/constants/story-constants/story-status.constants';

export class FilterMultipleStoryDto {
  @IsNumber()
  @Type(() => Number)
  offset: number = 0;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @Max(50)
  limit: number = 20;

  @IsString()
  @MaxLength(120)
  @IsOptional()
  title?: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  genreName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  secondaryGenreName?: string;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  totalRating?: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  totalViews?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  totalChapters?: boolean;

  @IsOptional()
  @IsString()
  status?: AllowedStatus;

  @IsString()
  @IsOptional()
  userId?: string;
}
