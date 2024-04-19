import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export type ReadonlyRecord<P extends string = string, Q = P> = Readonly<
  Record<P, Q>
>;

export type OrderBy = 'time' | 'time_oldest' | 'view';
export const OrderByTypes: ReadonlyRecord<OrderBy> = {
  time: 'time',
  time_oldest: 'time_oldest',
  view: 'view',
};

export class SearchVideoDto {
  @IsOptional()
  @IsString()
  @Length(26, 26)
  public readonly memberId: string;
  
  @IsOptional()
  @IsString()
  public readonly keyword: string = '';

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
  @Min(1)
  @Max(100)
  public readonly perPage: number = 30;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public readonly page: number = 1;
}
