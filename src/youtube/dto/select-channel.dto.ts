import { IsString } from 'class-validator';

export class SelectChannelDto {
  @IsString({ each: true })
  readonly channelId: string[];

  @IsString({ each: true })
  readonly part: string[] = ['id', 'snippet', 'statistics', 'brandingSettings'];
}
