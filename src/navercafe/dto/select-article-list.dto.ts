import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class SelectArticleListDto {
  @IsInt()
  @Type(() => Number)
  readonly menuId: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  readonly page?: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(50)
  readonly perPage?: number = 50;

  constructor(partial: Partial<SelectArticleListDto>) {
    Object.assign(this, partial);
  }
}
