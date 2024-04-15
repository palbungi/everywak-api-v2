import { IsString } from 'class-validator';

export class SelectPlaylistDto {
  @IsString()
  readonly playlistId: string;

  @IsString({ each: true })
  readonly part: string[] = ['snippet'];
}
