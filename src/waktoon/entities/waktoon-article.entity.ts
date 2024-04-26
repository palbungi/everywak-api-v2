import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WaktoonAuthor } from './waktoon-author.entity';

@Entity()
export class WaktoonArticle {
  @PrimaryColumn({
    type: 'int',
  })
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
    type: 'int',
  })
  public menuId: number;

  @Column({
    type: 'varchar',
    length: 512,
  })
  public title: string;

  @ManyToOne(() => WaktoonAuthor)
  @JoinColumn({
    name: 'memberKey',
    referencedColumnName: 'memberKey',
  })
  public member: WaktoonAuthor;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  public thumbnails: string;

  @Column({
    type: 'int',
  })
  public readCount: number;

  @Column({
    type: 'int',
  })
  public commentCount: number;

  @Column({
    type: 'int',
  })
  public upCount: number;
  
  constructor(partial: Partial<WaktoonArticle>) {
    Object.assign(this, partial);
  };
}
