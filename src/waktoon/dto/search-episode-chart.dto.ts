import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export type ReadonlyRecord<P extends string = string, Q = P> = Readonly<
  Record<P, Q>
>;

export type OrderBy = 'read' | 'up' | 'comment';
export const OrderByTypes: ReadonlyRecord<OrderBy> = {
  read: 'read',
  up: 'up',
  comment: 'comment',
};

export class SearchEpisodeChartDto {
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
  public readonly orderBy: OrderBy = 'read';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  public readonly perPage: number = 30;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public readonly page: number = 1;
}
