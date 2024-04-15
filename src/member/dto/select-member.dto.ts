import { Type } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class SelectMemberDto {
  @Type(() => String)
  @IsString()
  @Length(26, 26)
  public readonly memberId: string;
}
