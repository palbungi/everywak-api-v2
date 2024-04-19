import { Column, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Video } from './video.entity';

export class VideoViewCount {
  @PrimaryColumn({
    type: 'varchar',
    length: 128 + 8,
  })
  public id: string;

  @ManyToOne(() => Video)
  @JoinColumn({ name: 'videoId' })
  public video: Video;

  @Column({
    type: 'int',
    length: 8,
  })
  public time: number;

  @Column({
    type: 'int',
  })
  public viewCount: number;
}
