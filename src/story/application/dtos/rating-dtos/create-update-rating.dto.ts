import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateOrUpdateRatingDto {
  @IsString({ message: 'El userId debe ser un string' })
  @IsNotEmpty({ message: 'El userId no puede estar vacío' })
  userId: string;

  @IsString({ message: 'El storyId debe ser un string' })
  @IsNotEmpty({ message: 'El storyId no puede estar vacío' })
  storyId: string;
  @Max(10, {
    message: 'El puntaje no puede ser mayor a 10',
  })
  @Min(0, {
    message: 'El puntaje no puede ser menor a 0',
  })
  @IsInt({
    message: 'El puntaje tiene que ser un numero entero',
  })
  @IsNumber()
  @IsNotEmpty({
    message:
      'No puede crear/actualizar el rating sin haber proporcionado un puntaje',
  })
  @Type(() => Number)
  score?: number;
}
