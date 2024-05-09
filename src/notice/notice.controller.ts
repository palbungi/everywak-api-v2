import { Controller, Get, Query } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SearchMemberNoticeDto } from './dto/search-member-notice.dto';
import { NoticeService } from './notice.service';

@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get('/list')
  list(@Query() dto: SearchMemberNoticeDto) {
    return this.noticeService.find(dto);
  }

  @Get('/update')
  update() {
    return this.noticeService.update();
  }

  @Cron('0 */5 * * * *')
  updateCron() {
    return this.noticeService.update();
  }
}
