import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export type ReadonlyRecord<P extends string = string, Q = P> = Readonly<
  Record<P, Q>
>;

export type SearchTarget =
  | 'nickname'
  | 'memberKey';
export const SearchTargetTypes: ReadonlyRecord<SearchTarget> = {
  nickname: 'nickname',
  memberKey: 'memberKey',
};

export class SearchAuthorDto {
  @IsOptional()
  @IsString()
  public readonly keyword: string = '';

  @IsOptional()
  @IsEnum(SearchTargetTypes)
  public readonly searchTarget: string = 'nickname';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(5)
  @Max(500)
  public readonly perPage: number = 30;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public readonly page: number = 1;
}
