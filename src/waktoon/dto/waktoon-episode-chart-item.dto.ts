import { IsInt } from 'class-validator';
import { WaktoonEpisode } from '../entities/waktoon-episode.entity';

export class WaktoonEpisodeChartItem extends WaktoonEpisode {

  @IsInt()
  public diffReadCount: number;

  @IsInt()
  public diffCommentCount: number;

  @IsInt()
  public diffUpCount: number;

  constructor(partial: Partial<WaktoonEpisodeChartItem>) {
    super(partial);
    Object.assign(this, partial);
  }
}
