import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateFavoriteStoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  userId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  storyId!: string;
}
