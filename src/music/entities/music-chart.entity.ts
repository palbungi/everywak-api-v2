import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Music } from './music.entity';

@Entity()
export class MusicChart {
  @PrimaryColumn({
    type: 'varchar',
    length: 26 + 1 + 8,
  })
  public id: string;

  @ManyToOne(() => Music, null, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'musicId' })
  public music: Music;

  @Column({
    type: 'varchar',
    length: 8,
  })
  public duration: string;

  @Column({
    type: 'int',
  })
  public increasedViewCount: number;

  constructor(partial: Partial<MusicChart>) {
    Object.assign(this, partial);
  }
}
