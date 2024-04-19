import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from 'src/member/member.module';
import { YoutubeModule } from 'src/youtube/youtube.module';
import { VideoViewCount } from './entities/video-view-count.entity';
import { Video } from './entities/video.entity';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Video, VideoViewCount]),
    MemberModule,
    YoutubeModule,
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
