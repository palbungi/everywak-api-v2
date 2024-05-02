import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { WaktoonEpisode } from './waktoon-episode.entity';

@Entity()
export class WaktoonEpisodePopularity {
  @PrimaryColumn({
    type: 'varchar',
    length: 26 + 1 + 8,
  })
  public id: string;

  @ManyToOne(() => WaktoonEpisode, null, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'episodeId' })
  public episode: WaktoonEpisode;

  @Column({
    type: 'int',
  })
  public time: number;

  @Column({
    type: 'int',
  })
  public readCount: number;

  @Column({
    type: 'int',
  })
  public commentCount: number;

  @Column({
    type: 'int',
  })
  public upCount: number;

  constructor(partial: Partial<WaktoonEpisodePopularity>) {
    Object.assign(this, partial);
  }
}
