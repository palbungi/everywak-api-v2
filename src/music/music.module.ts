import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from 'src/member/member.module';
import { VideoModule } from 'src/video/video.module';
import { MusicChart } from './entities/music-chart.entity';
import { Music } from './entities/music.entity';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';

@Module({
  imports: [TypeOrmModule.forFeature([Music, MusicChart]), MemberModule, VideoModule],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}
