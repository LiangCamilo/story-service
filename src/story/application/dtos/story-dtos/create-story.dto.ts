import { IsArray, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateStoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120, { message: 'El título no puede exceder los 120 caracteres' })
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  genreName!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  userId!: string;

  @IsArray()
  @IsString({ each: true, message: 'Cada tag debe ser un texto' })
  @MaxLength(50)
  secondaryGenreName?: string;
  tagNames!: string[] | undefined;
}
