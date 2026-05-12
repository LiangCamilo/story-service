import { Type, Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  IsArray,
} from 'class-validator';
import { AllowedStatus } from 'src/story/domain/constants/story-constants/story-status.constants';

const parseBoolean = ({ value }: { value: unknown }) => {
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return value;
};

export class FilterMultipleStoryDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  offset: number = 1;

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
  @Transform(parseBoolean)
  totalRating?: boolean;

  @IsOptional()
  @Transform(parseBoolean)
  @IsBoolean()
  hidden?: boolean;

  @IsOptional()
  @IsString()
  status?: AllowedStatus;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') return value.split(',').map((v) => v.trim());
    return value;
  })
  tagNames?: string[];

  @IsBoolean()
  @IsOptional()
  @Transform(parseBoolean)
  newestFirst!: boolean;
}
