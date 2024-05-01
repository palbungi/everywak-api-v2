import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class SelectPlaylistDto {
  @IsString()
  readonly playlistId: string;

  @IsString({ each: true })
  readonly part: string[] = ['snippet'];

  @IsOptional()
  @IsInt()
  readonly selectAll: boolean = false;

  constructor(partial: Partial<SelectPlaylistDto>) {
    Object.assign(this, partial);
  }
}
