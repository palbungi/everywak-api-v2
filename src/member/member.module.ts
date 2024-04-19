import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LiveChange } from 'src/live/entities/live-change.entity';
import { Live } from 'src/live/entities/live.entity';
import { OBI } from 'src/obi/entities/obi.entity';
import { YoutubeModule } from 'src/youtube/youtube.module';
import { LivePlatform } from './entities/livePlatform.entity';
import { Member } from './entities/member.entity';
import { Profile } from './entities/profile.entity';
import { Social } from './entities/social.entity';
import { YoutubeChannel } from './entities/youtubeChannel.entity';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Member,
      Profile,
      LivePlatform,
      Social,
      YoutubeChannel,
      OBI,
      Live,
      LiveChange,
    ]),
    YoutubeModule,
  ],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService],
})
export class MemberModule {}
