import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateChapterDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  storyId!: string;
}
