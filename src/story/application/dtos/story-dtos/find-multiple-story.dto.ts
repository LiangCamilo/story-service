import { IsEmpty, IsNumber, Max } from 'class-validator';

export class FindMultipleStoryDto {
  @IsNumber()
  @IsEmpty()
  offset!: number;

  @IsNumber()
  @Max(50)
  @IsEmpty()
  limit!: number;
}
