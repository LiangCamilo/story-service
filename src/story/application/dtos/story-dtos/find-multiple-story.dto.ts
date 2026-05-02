import { Type } from 'class-transformer';
import { IsNumber, IsPositive, Max } from 'class-validator';

export class FindMultipleStoryDto {
  @IsNumber()
  @Type(() => Number)
  offset: number = 0;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @Max(50)
  limit: number = 20;
}
