import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SearchTagsByNameDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit: number = 20;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  offset: number = 0;

  @IsOptional()
  @IsString()
  tagName: string = '';
}
