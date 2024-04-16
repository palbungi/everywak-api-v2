import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulidx';
import { Member } from './member.entity';

@Entity()
export class LivePlatform {
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
    length: 50,
  })
  public channelId: string;

  @ManyToOne(() => Member, (member) => member.livePlatform, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'memberId' })
  public member: Member;
}
