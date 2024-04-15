import {
  Column,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PopularArticle {
  @PrimaryColumn('int')
  public articleId: number;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  public updatedTimestamp: Date;

  @Column({
    type: 'timestamp',
    precision: 3,
  })
  public publishedTimestamp: Date;

  @Column({
    type: 'timestamp',
    precision: 3,
    nullable: true,
  })
  public lastCommentTimestamp: Date;

  @Column({ type: 'varchar', length: 303 })
  public subject: string;

  @Column({ type: 'varchar', length: 33 })
  public nickname: string;

  @Column({ type: 'varchar', length: 45 })
  public memberKey: string;

  @Column('int')
  public menuId: number;

  @Column({ type: 'varchar', length: 128 })
  public menuName: string;

  @Column('int')
  public readCount: number;

  @Column('int')
  public commentCount: number;

  @Column('int')
  public upCount: number;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  public representImage: string;

  @Column({ type: 'varchar', length: 8, nullable: true })
  public representImageType: string;

  @Column('int')
  public imageCount: number;

  @Column('int')
  public totalScore: number;

  constructor(partial: Partial<PopularArticle>) {
    Object.assign(this, partial);
  }
}
