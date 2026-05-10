import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @MaxLength(1000)
  content!: string;

  @IsUUID()
  storyId?: string;

  @IsUUID()
  chapterId?: string;
}
