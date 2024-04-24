import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, Length, Max, Min } from 'class-validator';

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
  @Length(1, 10)
  public readonly channelType: string;
  
  @IsOptional()
  @IsString()
  public readonly keyword: string = '';

  @IsOptional()
  @IsBoolean()
  @Transform((value) => {
    return value.value == 'true' ? true : false;
  })
  public readonly isShorts: boolean;

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
