import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, lastValueFrom, map } from 'rxjs';
import { ArticleListDto, ArticleListItem } from './dto/article-list.dto';
import { ArticleDto } from './dto/article.dto';
import { NaverCafeError } from './dto/error.dto';
import { MenuDto } from './dto/menu.dto';
import { PopularArticleDto } from './dto/popular-article.dto';
import { SelectArticleListDto } from './dto/select-article-list.dto';

@Injectable()
export class NavercafeService {
  constructor(private readonly httpService: HttpService) {}
  private logger = new Logger(NavercafeService.name);

  getPopularArticles(): Promise<PopularArticleDto[]> {
    this.logger.log(`인기글 목록 요청`);
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
    this.logger.log(`게시판 목록 요청`);
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
    this.logger.log(
      `게시판 글 목록 요청 (menuId: ${selectArticleListDto.menuId}, lastArticleId: ${selectArticleListDto.lastArticleId})`,
    );
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

  async getAllArticleList(menuId: number): Promise<ArticleListItem[]> {
    this.logger.log(`게시판 모든 글 목록 요청 (menuId: ${menuId})`);
    const result: ArticleListItem[] = [];

    let lastArticleId = 0;
    while (true) {
      const articleListResponse = await this.getArticleList(
        new SelectArticleListDto({
          menuId,
          lastArticleId,
          perPage: 50,
        }),
      );
      console.log(articleListResponse.articleList.length);
      if (articleListResponse.articleList.length === 0) {
        break;
      }
      result.push(...articleListResponse.articleList);
      lastArticleId = articleListResponse.articleList.slice(-1)[0].articleId;
    }

    return result;
  }

  getArticle(articleId: string): Promise<ArticleDto> {
    this.logger.log(`게시글 정보 요청 (articleId: ${articleId})`);
    return lastValueFrom(
      this.httpService
        .get(
          `https://apis.naver.com/cafe-web/cafe-articleapi/v3/cafes/27842958/articles/${articleId}`,
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
                this.logger.warn(`게시글 정보 요청 실패: 알 수 없는 오류`);
                throw new InternalServerErrorException(
                  '알 수 없는 오류가 발생했습니다.',
                );
              }
              this.logger.warn(`게시글 정보 요청 실패: ${message}`);
              throw new InternalServerErrorException(
                `${errorCode}: ${message}`,
              );
            }
            this.logger.error(
              `게시글 정보 요청 실패: 알 수 없는 오류: ${JSON.stringify(err)}`,
            );
            console.log(err);
            throw err;
          }),
        ),
    );
  }
}
