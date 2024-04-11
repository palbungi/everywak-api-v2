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
  getAll() {
    return this.bestwakkiService.getAll();
  }
  @Get('/list')
  search(@Query() query: SearchArticleDto) {
    console.log(query)
    return this.bestwakkiService.search(query);
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
