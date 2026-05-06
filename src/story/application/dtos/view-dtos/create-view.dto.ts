import { IsNotEmpty, IsString } from 'class-validator';

export class CreateViewDto {
  @IsString({ message: 'El userId debe ser un string' })
  @IsNotEmpty({ message: 'El userId no puede estar vacío' })
  userId: string;

  @IsString({ message: 'El storyId debe ser un string' })
  @IsNotEmpty({ message: 'El storyId no puede estar vacío' })
  storyId: string;
}
