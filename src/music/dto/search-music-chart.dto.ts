import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

export type ReadonlyRecord<P extends string = string, Q = P> = Readonly<
  Record<P, Q>
>;

export type Duration = 'hourly' | '24hours' | 'daily' | 'weekly' | 'monthly';
export const DurationTypes: ReadonlyRecord<Duration> = {
  hourly: 'hourly',
  '24hours': '24hours',
  daily: 'daily',
  weekly: 'weekly',
  monthly: 'monthly',
};

export class SearchMusicChartDto {
  @IsEnum(DurationTypes)
  public readonly duration: Duration;

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
