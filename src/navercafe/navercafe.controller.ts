import { Controller, Get, Param, Query } from '@nestjs/common';
import { SelectArticleListDto } from './dto/select-article-list.dto';
import { NavercafeService } from './navercafe.service';

@Controller('navercafe')
export class NavercafeController {
  constructor(private readonly navercafeService: NavercafeService) {}

  @Get()
  getPopularArticle() {
    return this.navercafeService.getPopularArticles();
  }

  @Get('/articles')
  getArticleList(@Query() selectArticleListDto: SelectArticleListDto) {
    return this.navercafeService.getArticleList(selectArticleListDto);
  }

  @Get('/article/:articleId')
  getArticle(@Param('articleId') articleId: string) {
    return this.navercafeService.getArticle(articleId);
  }
}
