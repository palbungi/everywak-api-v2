import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ulid } from 'ulidx';
import { WaktoonArticle } from './waktoon-article.entity';
import { WaktoonAuthor } from './waktoon-author.entity';
import { WaktoonEpisodeChart } from './waktoon-episode-chart.entity';
import { WaktoonSeries } from './waktoon-series.entity';

@Entity()
export class WaktoonEpisode {
  @PrimaryColumn({
    type: 'varchar',
    length: 26,
  })
  public id: string = ulid();

  @OneToOne(() => WaktoonArticle)
  @JoinColumn({
    name: 'articleId',
    referencedColumnName: 'articleId',
  })
  public article: WaktoonArticle;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  public updatedTimestamp: Date;

  @Column({
    type: 'varchar',
    length: 512,
  })
  public title: string;

  @ManyToOne(() => WaktoonAuthor)
  @JoinColumn({
    name: 'memberKey',
    referencedColumnName: 'memberKey',
  })
  public member: WaktoonAuthor;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  public description: string;

  @Column({
    type: 'int',
    default: 1,
  })
  public episodeNumber: number;

  @ManyToOne(() => WaktoonSeries, (series) => series.episodes, {
    nullable: true,
  })
  @JoinColumn({
    name: 'seriesId',
    referencedColumnName: 'id',
  })
  public series: WaktoonSeries;

  @OneToMany(() => WaktoonEpisodeChart, (chart) => chart.episode)
  public charts: WaktoonEpisodeChart[];

  constructor(partial: Partial<WaktoonEpisode>) {
    Object.assign(this, partial);
  }
}
