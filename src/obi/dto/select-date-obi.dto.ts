import { IsString, Length } from 'class-validator';

export class SelectDateOBIDto {
  @IsString()
  @Length(6, 6)
  public readonly date: string;
}
