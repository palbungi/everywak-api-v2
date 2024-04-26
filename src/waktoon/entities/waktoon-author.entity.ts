import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class WaktoonAuthor {
  @PrimaryColumn({
    type: 'varchar',
    length: 30,
    comment: '회원키',
  })
  public memberKey: string;

  @Column({
    type: 'varchar',
    length: 33,
    comment: '닉네임',
  })
  public nickname: string;

  @Column({
    type: 'varchar',
    length: 300,
    comment: '프로필 이미지',
    nullable: true,
  })
  public profileImage: string;

  @Column({
    type: 'int',
    comment: '작품수',
    default: 0,
  })
  public articleCount: number;

  @Column({
    type: 'int',
    comment: '조회수',
    default: 0,
  })
  public readCount: number;

  @Column({
    type: 'int',
    comment: '댓글수',
    default: 0,
  })
  public commentCount: number;

  @Column({
    type: 'int',
    comment: '좋아요수',
    default: 0,
  })
  public upCount: number;
  
  constructor(partial: Partial<WaktoonAuthor>) {
    Object.assign(this, partial);
  };
}
