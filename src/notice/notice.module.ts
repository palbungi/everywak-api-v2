import { Module } from '@nestjs/common';
import { MemberModule } from 'src/member/member.module';
import { NavercafeModule } from 'src/navercafe/navercafe.module';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';

@Module({
  imports: [NavercafeModule, MemberModule],
  controllers: [NoticeController],
  providers: [NoticeService],
})
export class NoticeModule {}
