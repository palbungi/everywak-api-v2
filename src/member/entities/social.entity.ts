import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulidx';
import { Member } from './member.entity';

@Entity()
export class Social {
  @PrimaryColumn({
    type: 'varchar',
    length: 26,
  })
  public id: string;

  @PrimaryColumn({
    type: 'varchar',
    length: 12,
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
  public userId: string;

  @ManyToOne(() => Member, (member) => member.social, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'memberId' })
  public member: Member;
}
