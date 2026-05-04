import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class CreateOrUpdateRatingDto {
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
