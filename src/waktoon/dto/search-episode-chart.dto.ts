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

export type Duration = 'hourly' | '24hours' | 'daily' | 'weekly' | 'monthly';
export const DurationTypes: ReadonlyRecord<Duration> = {
  hourly: 'hourly',
  '24hours': '24hours',
  daily: 'daily',
  weekly: 'weekly',
  monthly: 'monthly',
};

export class SearchEpisodeChartDto {
  @IsEnum(DurationTypes)
  public readonly duration: Duration;

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
