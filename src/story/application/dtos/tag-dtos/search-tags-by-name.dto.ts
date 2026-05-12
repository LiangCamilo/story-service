import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class SearchTagsByNameDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  limit: number = 20;

  @IsOptional()
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  offset: number = 0;

  @IsOptional()
  @IsString()
  tagName: string = '';
}
