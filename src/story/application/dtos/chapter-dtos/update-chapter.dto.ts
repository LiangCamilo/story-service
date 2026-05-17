import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateChapterDto {
  @IsString()
  @IsOptional()
  @MaxLength(100000)
  title!: string;

  @IsString()
  @IsOptional()
  content!: string;
}
