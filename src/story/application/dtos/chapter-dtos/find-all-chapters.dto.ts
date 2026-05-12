import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  Max,
} from 'class-validator';

const parseBoolean = ({ value }: { value: unknown }) => {
  if (value === true || value === 'true') return true;
  if (value === false || value === 'false') return false;
  return value;
};

export class FindAllChaptersDto {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  offset: number = 0;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @Max(50)
  limit: number = 20;

  @IsBoolean()
  @IsOptional()
  @Transform(parseBoolean)
  newestFirst!: boolean;
}
