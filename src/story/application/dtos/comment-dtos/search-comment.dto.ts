import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class SearchCommentDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit!: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  offset!: number;
}
