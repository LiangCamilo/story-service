import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @MaxLength(1000)
  content!: string;

  @IsUUID()
  @IsOptional()
  storyId?: string;

  @IsUUID()
  @IsOptional()
  chapterId?: string;
}
