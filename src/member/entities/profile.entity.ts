import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulidx';
import { Member } from './member.entity';

@Entity()
export class Profile {
  @PrimaryColumn({
    type: 'varchar',
    length: 26,
    default: ulid(),
  })
  public id: string;

  @OneToOne(() => Member, (member) => member.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'memberId' })
  public member: Member;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  public profileImage: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  public offlineImage: string;
}
