import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Video } from './video.entity';

@Entity()
export class VideoViewCount {
  @PrimaryColumn({
    type: 'varchar',
    length: 128 + 8,
  })
  public id: string;

  @ManyToOne(() => Video, null, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'videoId' })
  public video: Video;

  @Column({
    type: 'int',
  })
  public time: number;

  @Column({
    type: 'int',
  })
  public viewCount: number;

  constructor(partial: Partial<VideoViewCount>) {
    Object.assign(this, partial);
  }
}
