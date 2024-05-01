import { LivePlatform } from 'src/member/entities/livePlatform.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ulid } from 'ulidx';

@Entity()
export class LiveChange {
  @PrimaryColumn({
    type: 'varchar',
    length: 26,
  })
  public id: string = ulid();

  @ManyToOne(() => LivePlatform, null, {
    onDelete: 'CASCADE',
  })
  @JoinColumn([
    {
      name: 'memberId',
      referencedColumnName: 'id',
    },
    {
      name: 'type',
      referencedColumnName: 'type',
    },
  ])
  public livePlatform: LivePlatform;

  @Column({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updatedTimestamp: Date = new Date();

  @Column({
    type: 'varchar',
    length: 30,
  })
  public status: string;

  @Column({
    type: 'varchar',
    length: 200,
  })
  public title: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  public titlePrev: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  public videoId: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  public chatId: string;

  @Column({
    type: 'timestamp',
    precision: 3,
  })
  public startedTimestamp: Date;

  @Column({
    type: 'timestamp',
    precision: 3,
    nullable: true,
  })
  public endedTimestamp: Date;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  public thumbnail: string;

  @Column({
    type: 'int',
  })
  public viewerCount: number;

  constructor(partial: Partial<LiveChange>) {
    Object.assign(this, partial);
  }
}
