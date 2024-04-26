import { IsNotEmpty, IsString } from 'class-validator';

export class InsertSeriesDto {
  @IsString()
  @IsNotEmpty()
  public readonly title: string;

  @IsString()
  @IsNotEmpty()
  public readonly authorName: string;

  @IsString({ each: true })
  @IsNotEmpty()
  public readonly members: string[];

  @IsString()
  @IsNotEmpty()
  public readonly parseRegex: string;

  @IsString()
  public readonly description: string;

  @IsString()
  public readonly thumbnails: string;
}
