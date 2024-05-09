import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Length, Max, Min } from "class-validator";

export class SearchMemberNoticeDto {
  @IsString()
  @Length(26, 26)
  public readonly memberId: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  public readonly page: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(50)
  public readonly perPage: number = 30;

  constructor(partial: Partial<SearchMemberNoticeDto>) {
    Object.assign(this, partial);
  }
}
