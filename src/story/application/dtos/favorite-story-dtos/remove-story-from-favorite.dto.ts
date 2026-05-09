import { IsNotEmpty, IsUUID } from 'class-validator';

export class RemoveStoryFromFavoriteDto {
  @IsNotEmpty()
  @IsUUID()
  userId!: string;

  @IsNotEmpty()
  @IsUUID()
  storyId!: string;
}
