import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export type ReadonlyRecord<P extends string = string, Q = P> = Readonly<
  Record<P, Q>
>;

export type SearchTarget = 'title' | 'author' | 'board';
export const SearchTargetTypes: ReadonlyRecord<SearchTarget> = {
  title: 'title',
  author: 'author',
  board: 'board',
};

export type OrderBy = 'time' | 'time_oldest' | 'read' | 'up' | 'comment';
export const OrderByTypes: ReadonlyRecord<OrderBy> = {
  time: 'time',
  time_oldest: 'time_oldest',
  read: 'read',
  up: 'up',
  comment: 'comment',
};

export class SearchArticleDto {
  @IsOptional()
  @IsString()
  public readonly keyword: string = '';

  @IsOptional()
  @IsEnum(SearchTargetTypes)
  public readonly searchTarget: string = 'title';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  public readonly beginAt: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  public readonly endAt: number;

  @IsOptional()
  @IsEnum(OrderByTypes)
  public readonly orderBy: OrderBy = 'time';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(5)
  @Max(500)
  public readonly perPage: number = 30;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  public readonly page: number = 1;
}
