import { IsNotEmpty, IsUUID } from 'class-validator';

export class ExistsFavoriteStoryDto {
  @IsNotEmpty({ message: 'El userId no puede estar vacío' })
  @IsUUID('4', { message: 'El userId debe ser un UUID válido' })
  userId!: string;

  @IsNotEmpty({ message: 'El storyId no puede estar vacío' })
  @IsUUID('4', { message: 'El storyId debe ser un UUID válido' })
  storyId!: string;
}
