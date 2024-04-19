import { Member } from 'src/member/entities/member.entity';
import { YoutubeChannel } from 'src/member/entities/youtubeChannel.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Video {
  @UpdateDateColumn({
    type: 'timestamp',
    precision: 3,
  })
  public updatedTimestamp: Date;

  @Column({
    type: 'timestamp',
    precision: 3,
  })
  public publishedTimestamp: Date;

  @PrimaryColumn({
    type: 'varchar',
    length: 128,
  })
  public videoId: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  public title: string;

  @ManyToOne(() => Member)
  @JoinColumn({ name: 'memberId' })
  public member: Member;

  @ManyToOne(() => YoutubeChannel)
  @JoinColumn([
    { name: 'channel_id', referencedColumnName: 'id' },
    { name: 'channel_type', referencedColumnName: 'type' },
  ])
  public channel: YoutubeChannel;

  @Column({
    type: 'varchar',
    length: 7500,
  })
  public description: string;

  @Column({
    type: 'varchar',
    length: 600,
  })
  public thumbnails: string;

  @Column({
    type: 'int',
  })
  public viewCount: number;

  @Column({
    type: 'int',
  })
  public duration: number;

  @Column({
    type: 'boolean',
  })
  public isShorts: boolean = false;

  constructor(partial: Partial<Video>) {
    Object.assign(this, partial);
  }
}
