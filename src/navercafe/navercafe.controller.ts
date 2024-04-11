import { Controller, Get } from '@nestjs/common';
import { NavercafeService } from './navercafe.service';

@Controller('navercafe')
export class NavercafeController {
  constructor(private readonly navercafeService: NavercafeService) {}

  @Get()
  getPopularArticle() {
    return this.navercafeService.getPopularArticles();
  }
}
