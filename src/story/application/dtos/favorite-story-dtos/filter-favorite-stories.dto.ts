import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';
import { AllowedStatus } from 'src/story/domain/constants/story-constants/story-status.constants';

const parseBoolean = ({ value }: { value: unknown }) => {
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return value;
};

export class FilterFavoriteStoriesDto {
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  offset: number = 0;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
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

  @IsOptional()
  @Transform(parseBoolean)
  @IsBoolean()
  totalViews?: boolean;

  @IsOptional()
  @Transform(parseBoolean)
  @IsBoolean()
  totalChapters?: boolean;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  totalRating?: boolean;

  @IsOptional()
  @IsString()
  status?: AllowedStatus;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return value.split(',').map((v) => v.trim());
    return value;
  })
  tagNames?: string[];
}
