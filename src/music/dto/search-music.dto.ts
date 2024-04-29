import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export type ReadonlyRecord<P extends string = string, Q = P> = Readonly<
  Record<P, Q>
>;

export type SearchTarget = 'title' | 'singer';
export const SearchTargetTypes: ReadonlyRecord<SearchTarget> = {
  title: 'title',
  singer: 'singer',
};

export type OrderBy = 'time' | 'time_oldest' | 'view';
export const OrderByTypes: ReadonlyRecord<OrderBy> = {
  time: 'time',
  time_oldest: 'time_oldest',
  view: 'view',
};

export class SearchMusicDto {
  @IsString()
  public readonly keyword: string = '';

  @IsString()
  @IsEnum(SearchTargetTypes)
  public readonly searchTarget: string = 'title';

  @IsString()
  @IsEnum(OrderByTypes)
  public readonly orderBy: OrderBy = 'time';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(5)
  @Max(100)
  public readonly perPage: number = 50;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public readonly page: number = 1;
}
