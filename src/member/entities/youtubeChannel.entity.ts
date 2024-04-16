import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulidx';
import { Member } from './member.entity';

@Entity()
export class YoutubeChannel {
  @PrimaryColumn({
    type: 'varchar',
    length: 26,
  })
  public id: string;

  @PrimaryColumn({
    type: 'varchar',
    length: 10,
  })
  public type: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  public name: string;

  @Column({
    type: 'varchar',
    length: 24,
  })
  public channelId: string;

  @Column({
    type: 'varchar',
    length: 34,
  })
  public uploads: string;

  @ManyToOne(() => Member, (member) => member.youtubeChannel)
  @JoinColumn({ name: 'memberId' })
  public member: Member;
}
