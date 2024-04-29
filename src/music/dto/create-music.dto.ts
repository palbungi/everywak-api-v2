import { IsString, Length } from 'class-validator';

export class CreateMusicDto {
  @IsString()
  @Length(11, 11)
  public readonly videoId: string;

  @IsString()
  public readonly title: string;

  @IsString()
  public readonly singerName: string;

  @IsString({ each: true })
  @Length(26, 26, { each: true })
  public readonly singers: string[];
}
