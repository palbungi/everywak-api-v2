import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class SelectVideoDto {
  @IsString({ each: true })
  readonly videoIds: string[];

  @IsString({ each: true })
  readonly part: string[] = ['id', 'snippet', 'contentDetails', 'statistics'];

  constructor(partial: Partial<SelectVideoDto>) {
    Object.assign(this, partial);
  }
}
