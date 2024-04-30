import { Controller, Get, Param, Query } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BestwakkiService } from './bestwakki.service';
import { SearchArticleDto } from './dto/search-article.dto';

@Controller('bestwakki')
export class BestwakkiController {
  constructor(
    private readonly bestwakkiService: BestwakkiService,
  ) {}

  @Get()
  findAll() {
    return this.bestwakkiService.findAll();
  }

  @Get('/list')
  find(@Query() query: SearchArticleDto) {
    console.log(query)
    return this.bestwakkiService.find(query);
  }

  @Get('/update')
  update() {
    return this.bestwakkiService.update();
  }

  @Cron('0 45 * * * *', {
    name: 'update-popular-articles',
    timeZone: 'Asia/Seoul',
  })
  automatelyUpdate() {
    return this.bestwakkiService.update();
  }
}
