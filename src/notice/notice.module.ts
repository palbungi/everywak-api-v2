import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from 'src/member/member.module';
import { NavercafeModule } from 'src/navercafe/navercafe.module';
import { MemberNotice } from './entities/member-notice.entity';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MemberNotice]),
    NavercafeModule,
    MemberModule,
  ],
  controllers: [NoticeController],
  providers: [NoticeService],
})
export class NoticeModule {}
