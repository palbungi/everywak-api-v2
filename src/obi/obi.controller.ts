import { Controller, Get, Param, Post } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SelectDateOBIDto } from './dto/select-date-obi.dto';
import { ObiService } from './obi.service';

@Controller('obi')
export class ObiController {
  constructor(private readonly obiService: ObiService) {}

  @Get()
  getObi() {
    return this.obiService.findOBIRecent();
  }

  @Get('/:date')
  getObiByDate(@Param() dto: SelectDateOBIDto) {
    return this.obiService.findOBIByDate(dto);
  }

  @Post('/update')
  updateObi() {
    return this.obiService.updateOBI();
  }

  @Cron('0 0 * * * *', {
    name: 'update-obi',
    timeZone: 'Asia/Seoul',
  })
  automatelyUpdate() {
    return this.obiService.updateOBI();
  }
}
