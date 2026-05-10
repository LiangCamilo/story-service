import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateStoryTagsDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMaxSize(10, {
    message: 'No pueden añadirse más de 10 tags por historia',
  })
  @IsString({ each: true })
  @MaxLength(30, { each: true })
  tagNames!: string[];
}
