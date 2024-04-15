import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    ]),
    YoutubeModule,
  ],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
