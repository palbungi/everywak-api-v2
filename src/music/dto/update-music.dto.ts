import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateMusicDto {
  @IsString()
  @Length(26, 26)
  public readonly id: string;

  @IsOptional()
  @IsString()
  @Length(11, 11)
  public readonly videoId: string;

  @IsOptional()
  @IsString()
  public readonly title: string;

  @IsOptional()
  @IsString()
  public readonly singerName: string;

  @IsOptional()
  @IsString({ each: true })
  @Length(26, 26, { each: true })
  public readonly singers: string[];
}
