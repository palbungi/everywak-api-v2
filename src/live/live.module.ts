import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AfreecaModule } from 'src/afreeca/afreeca.module';
import { Member } from 'src/member/entities/member.entity';
import { MemberModule } from 'src/member/member.module';
import { YoutubeModule } from 'src/youtube/youtube.module';
import { LiveChange } from './entities/live-change.entity';
import { Live } from './entities/live.entity';
import { LiveController } from './live.controller';
import { LiveService } from './live.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Live, LiveChange, Member]),
    MemberModule,
    AfreecaModule,
    YoutubeModule,
  ],
  controllers: [LiveController],
  providers: [LiveService],
})
export class LiveModule {}
