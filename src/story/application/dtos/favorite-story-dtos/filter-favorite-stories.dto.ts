import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { AllowedStatus } from 'src/story/domain/constants/story-constants/story-status.constants';

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
  @IsNotEmpty({
    message:
      'Debe proporcionar un userId para filtrar y/o encontrar sus historias',
  })
  userId!: string;

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
