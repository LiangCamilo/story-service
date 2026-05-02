import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import {
  AllowedStatus,
  StoryStatusConstants,
} from '../../../domain/constants/story-constants/story-status.constants';

export class UpdateStoryDto {
  @IsString()
  @IsOptional()
  @MaxLength(120, { message: 'El título no puede exceder los 120 caracteres' })
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  genreName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  secondaryGenreName?: string;

  @IsOptional()
  @IsIn(StoryStatusConstants, {
    message: `El status debe ser uno de los siguientes: ${StoryStatusConstants.join(', ')}`,
  })
  status?: AllowedStatus;
}
