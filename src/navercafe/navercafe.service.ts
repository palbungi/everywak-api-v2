import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { MenuDto } from './dto/menu.dto';
import { PopularArticleDto } from './dto/popular-article.dto';

@Injectable()
export class NavercafeService {
  constructor(private readonly httpService: HttpService) {}

  getPopularArticles(): Promise<PopularArticleDto[]> {
    return lastValueFrom(
      this.httpService
        .get(
          'https://apis.naver.com/cafe-web/cafe2/WeeklyPopularArticleListV3.json',
          {
            params: {
              cafeId: 27842958,
              mobileWeb: true,
              adUnit: 'PC_CAFE_BOARD',
              ad: false,
            },
          },
        )
        .pipe(map((res) => res.data.message.result.articleList)),
    );
  }

  getMenus(): Promise<MenuDto[]> {
    return lastValueFrom(
      this.httpService
        .get('https://apis.naver.com/cafe-web/cafe2/SideMenuList', {
          params: {
            cafeId: 27842958,
          },
        })
        .pipe(map((res) => res.data.message.result.menus)),
    );
  }
}
