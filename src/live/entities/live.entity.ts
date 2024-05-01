import { LivePlatform } from 'src/member/entities/livePlatform.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Live {
  @PrimaryColumn({
    type: 'varchar',
    length: 37,
  })
  public id: string;

  @Column({
    type: 'boolean',
  })
  public isLive: boolean;

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

  @OneToOne(() => LivePlatform, null, { onDelete: 'CASCADE' })
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
}
