import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, lastValueFrom, map } from 'rxjs';
import { ArticleListDto } from './dto/article-list.dto';
import { ArticleDto } from './dto/article.dto';
import { NaverCafeError } from './dto/error.dto';
import { MenuDto } from './dto/menu.dto';
import { PopularArticleDto } from './dto/popular-article.dto';
import { SelectArticleListDto } from './dto/select-article-list.dto';

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

  getArticleList(
    selectArticleListDto: SelectArticleListDto,
  ): Promise<ArticleListDto> {
    const pagination = selectArticleListDto.lastArticleId
      ? {
          'search.queryType': 'lastArticle',
          'search.pageLastArticleId': selectArticleListDto.lastArticleId,
        }
      : {
          'search.page': selectArticleListDto.page,
        };
    return lastValueFrom(
      this.httpService
        .get('https://apis.naver.com/cafe-web/cafe2/ArticleListV2dot1.json', {
          params: {
            'search.clubid': 27842958,
            'search.menuid': selectArticleListDto.menuId,
            'search.perPage': selectArticleListDto.perPage,
            ...pagination,
          },
        })
        .pipe(map((res) => res.data.message.result)),
    );
  }

  getArticle(articleId: string): Promise<ArticleDto> {
    return lastValueFrom(
      this.httpService
        .get(
          `https://apis.naver.com/cafe-web/cafe-articleapi/v2/cafes/27842958/articles/${articleId}`,
          {
            headers: {
              Accept: 'application/json, text/plain, */*',
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
            },
          },
        )
        .pipe(map((res) => res.data.result))
        .pipe(
          catchError((err) => {
            if (err.isAxiosError) {
              const axiosError = err as AxiosError<NaverCafeError>;
              if (axiosError.response.status === 401) {
                throw new UnauthorizedException(
                  '로그인이 필요한 게시물입니다.',
                );
              }
              const { errorCode, reason, message } =
                axiosError.response.data.result;
              if (!errorCode) {
                throw new InternalServerErrorException(
                  '알 수 없는 오류가 발생했습니다.',
                );
              }
              throw new InternalServerErrorException(
                `${errorCode}: ${message}`,
              );
            }
            console.log(err);
            throw err;
          }),
        ),
    );
  }
}
