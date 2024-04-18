import { Member } from 'src/member/entities/member.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('OBI')
export class OBI {
  @PrimaryColumn({ type: 'varchar', length: 26 + 1 + 6 })
  id: string;

  @Column({ type: 'varchar', length: 6 })
  date: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedTimestamp: Date;

  @Column({ type: 'timestamp' })
  publishedTimestamp: Date;

  @Column({ type: 'varchar', length: 20 })
  weather: string;

  @Column({ type: 'varchar', length: 128 })
  rawInfo: string;

  @Column({ type: 'varchar', length: 192, nullable: true, default: '' })
  description: string;

  @ManyToOne(() => Member)
  @JoinColumn([
    {
      name: 'memberId',
      referencedColumnName: 'id',
    },
  ])
  member: Member;

  constructor(partial: Partial<OBI>) {
    Object.assign(this, partial);
  }
}
