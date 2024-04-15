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

  @OneToOne(() => Profile, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  public profile: Relation<Profile>;

  @OneToMany(() => LivePlatform, (livePlatform) => livePlatform.member)
  public livePlatform: LivePlatform[];

  @OneToMany(() => YoutubeChannel, (youtubeChannel) => youtubeChannel.member)
  public youtubeChannel: YoutubeChannel[];

  @OneToMany(() => Social, (social) => social.member)
  public social: Social[];
}
