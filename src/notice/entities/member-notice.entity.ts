import { Member } from 'src/member/entities/member.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class MemberNotice {
  @PrimaryColumn({
    type: 'int',
  })
  public readonly articleId: number;

  @Column({
    type: 'timestamp',
    precision: 3,
  })
  public readonly publishedTimestamp: Date;

  @Column({
    type: 'varchar',
    length: 303,
  })
  public readonly subject: string;

  @ManyToOne(() => Member, null, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'memberId',
    referencedColumnName: 'id',
  })
  public readonly member: Member;

  @Column({
    type: 'int',
  })
  public readonly menuId: number;

  @Column({
    type: 'varchar',
    length: 128,
  })
  public readonly menuName: string;

  @Column({
    type: 'int',
    default: 0,
  })
  public readonly readCount: number;

  @Column({
    type: 'int',
    default: 0,
  })
  public readonly commentCount: number;

  @Column({
    type: 'int',
    default: 0,
  })
  public readonly upCount: number;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  public readonly representImage: string;

  @Column({
    type: 'varchar',
    length: 8,
    nullable: true,
  })
  public readonly representImageType: string;

  @Column({
    type: 'int',
    default: 0,
  })
  public readonly imageCount: number;

  constructor(partial: Partial<MemberNotice>) {
    Object.assign(this, partial);
  }
}
