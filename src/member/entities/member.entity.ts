import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { ulid } from 'ulidx';
import { LivePlatform } from './livePlatform.entity';
import { Profile } from './profile.entity';
import { Social } from './social.entity';
import { YoutubeChannel } from './youtubeChannel.entity';

@Entity()
export class Member {
  @PrimaryColumn({
    type: 'varchar',
    length: 26,
    default: ulid(),
  })
  public id: string;

  @Column({
    type: 'varchar',
    length: 40,
    unique: true,
  })
  public name: string;

  @Column({
    type: 'varchar',
    length: 10,
  })
  public role: string;

  @OneToOne(() => Profile, (profile) => profile.member, { cascade: true })
  public profile: Profile;

  @OneToMany(() => LivePlatform, (livePlatform) => livePlatform.member, { cascade: true })
  public livePlatform: LivePlatform[];

  @OneToMany(() => YoutubeChannel, (youtubeChannel) => youtubeChannel.member, { cascade: true })
  public youtubeChannel: YoutubeChannel[];

  @OneToMany(() => Social, (social) => social.member, { cascade: true })
  public social: Social[];

  constructor(partial: Partial<Member>) {
    Object.assign(this, partial);
  }
}
