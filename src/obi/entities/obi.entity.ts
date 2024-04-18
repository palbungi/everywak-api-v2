import { Member } from 'src/member/entities/member.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('OBI')
export class OBI {
  @PrimaryColumn({ type: 'varchar', length: 26 + 1 + 6 })
  public id: string;

  @Column({ type: 'varchar', length: 6 })
  public date: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  public updatedTimestamp: Date;

  @Column({ type: 'timestamp' })
  public publishedTimestamp: Date;

  @Column({ type: 'varchar', length: 20 })
  public weather: string;

  @Column({ type: 'varchar', length: 128 })
  public rawInfo: string;

  @Column({ type: 'varchar', length: 192, nullable: true, default: '' })
  public description: string;

  @ManyToOne(() => Member)
  @JoinColumn([
    {
      name: 'memberId',
      referencedColumnName: 'id',
    },
  ])
  public member: Member;

  constructor(partial: Partial<OBI>) {
    Object.assign(this, partial);
  }
}
