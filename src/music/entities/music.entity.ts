import { Member } from 'src/member/entities/member.entity';
import { Video } from 'src/video/entities/video.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { ulid } from 'ulidx';

@Entity()
export class Music {
  @PrimaryColumn({
    type: 'varchar',
    length: 26,
  })
  public id: string = ulid();

  @OneToOne(() => Video)
  @JoinColumn({ name: 'videoId' })
  public video: Video;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  public createdTimestamp: Date;

  @Column({
    type: 'varchar',
    length: 128,
  })
  public title: string;

  @Column({
    type: 'varchar',
    length: 192,
  })
  public singerName: string;

  @ManyToMany(() => Member, null, { onDelete: 'SET NULL' })
  @JoinTable({
    name: 'music_singer',
    joinColumn: { name: 'musicId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'memberId', referencedColumnName: 'id' },
  })
  public singers: Member[];

  constructor(partial: Partial<Music>) {
    Object.assign(this, partial);
  }
}
