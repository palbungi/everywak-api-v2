import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { WaktoonEpisode } from './waktoon-episode.entity';

@Entity()
export class WaktoonEpisodeChart {
  @PrimaryColumn({
    type: 'varchar',
    length: 26 + 1 + 8,
  })
  public id: string;

  @ManyToOne(() => WaktoonEpisode)
  @JoinColumn({ name: 'episodeId' })
  public episode: WaktoonEpisode;

  @Column({
    type: 'varchar',
    length: 8,
  })
  public duration: string;

  @Column({
    type: 'int',
  })
  public increasedReadCount: number;

  @Column({
    type: 'int',
  })
  public increasedCommentCount: number;

  @Column({
    type: 'int',
  })
  public increasedUpCount: number;

  constructor(partial: Partial<WaktoonEpisodeChart>) {
    Object.assign(this, partial);
  }
}
