import { IsString, Length } from 'class-validator';

export class DeleteMusicDto {
  @IsString()
  @Length(26, 26)
  public readonly id: string;
}
