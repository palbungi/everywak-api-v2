import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ulid } from 'ulidx';
import { WaktoonAuthor } from './waktoon-author.entity';
import { WaktoonEpisode } from './waktoon-episode.entity';

@Entity()
export class WaktoonSeries {
  @PrimaryColumn({
    type: 'varchar',
    length: 26,
  })
  public id: string = ulid();

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  public updatedTimestamp: Date;

  @Column({
    type: 'timestamp',
    precision: 3,
  })
  public publishedTimestamp: Date;

  @Column({
    type: 'timestamp',
    precision: 3,
    nullable: true,
  })
  public lastPublishedTimestamp: Date;

  @Column({
    type: 'boolean',
  })
  public isBest: boolean = false;

  @Column({
    type: 'varchar',
    length: 512,
  })
  public title: string;

  @Column({
    type: 'varchar',
    length: 33,
  })
  public authorName: string;

  @ManyToMany(() => WaktoonAuthor, null, { onDelete: 'SET NULL' })
  @JoinTable({
    name: 'waktoon_series_member',
    joinColumn: {
      name: 'seriesId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'memberKey',
      referencedColumnName: 'memberKey',
    },
  })
  public members: WaktoonAuthor[];

  @Column({
    type: 'varchar',
    length: 512,
  })
  public parseRegex: string;

  @Column({
    type: 'varchar',
    length: 1024,
    default: '',
  })
  public description: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  public thumbnails: string;

  @Column({
    type: 'int',
    default: 0,
  })
  public episodeLength: number;

  @Column({
    type: 'int',
    default: 0,
  })
  public readCount: number;

  @Column({
    type: 'int',
    default: 0,
  })
  public commentCount: number;

  @Column({
    type: 'int',
    default: 0,
  })
  public upCount: number;

  @OneToMany(() => WaktoonEpisode, (episode) => episode.series)
  public episodes: WaktoonEpisode[];

  constructor(partial: Partial<WaktoonSeries>) {
    Object.assign(this, partial);
  }
}
