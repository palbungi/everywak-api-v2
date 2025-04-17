import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NavercafeService } from 'src/navercafe/navercafe.service';
import {
  Between,
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import {
  OrderBy,
  SearchArticleDto,
  SearchTarget,
} from './dto/search-article.dto';
import { PopularArticle } from './entities/popular-article.entity';

@Injectable()
export class BestwakkiService {
  @InjectRepository(PopularArticle)
  private popularArticleRepository: Repository<PopularArticle>;

  @Inject(NavercafeService)
  private readonly navercafeService: NavercafeService;

  private readonly logger = new Logger(BestwakkiService.name);

  findAll(): Promise<PopularArticle[]> {
    return this.popularArticleRepository.find();
  }

  find(searchArticleDto: SearchArticleDto) {
    this.logger.log(
      `왁물원 인기글 목록 조회: ${JSON.stringify(searchArticleDto)}`,
    );
    const searchTargetColumn: Record<SearchTarget, keyof PopularArticle> = {
      title: 'subject',
      author: 'nickname',
      board: 'menuName',
    };

    const orderBy: Record<OrderBy, FindOptionsOrder<PopularArticle>> = {
      time: { articleId: 'DESC' },
      time_oldest: { articleId: 'ASC' },
      read: { readCount: 'DESC' },
      up: { upCount: 'DESC' },
      comment: { commentCount: 'DESC' },
    };

    const where: FindOptionsWhere<PopularArticle> = {};
    if (searchArticleDto.keyword) {
      where[searchTargetColumn[searchArticleDto.searchTarget]] = ILike(
        `%${searchArticleDto.keyword}%`,
      );
    }
    if (searchArticleDto.beginAt && searchArticleDto.endAt) {
      where.publishedTimestamp = Between(
        new Date(searchArticleDto.beginAt),
        new Date(searchArticleDto.endAt),
      );
    } else if (searchArticleDto.beginAt) {
      where.publishedTimestamp = MoreThanOrEqual(
        new Date(searchArticleDto.beginAt),
      );
    } else if (searchArticleDto.endAt) {
      where.publishedTimestamp = LessThanOrEqual(
        new Date(searchArticleDto.endAt),
      );
    }

    return this.popularArticleRepository.find({
      select: [
        'articleId',
        'publishedTimestamp',
        'subject',
        'readCount',
        'commentCount',
        'upCount',
        'menuId',
        'menuName',
        'nickname',
        'representImage',
      ],
      where,
      order: orderBy[searchArticleDto.orderBy],
      take: searchArticleDto.perPage,
      skip: (searchArticleDto.page - 1) * searchArticleDto.perPage,
    });
  }

  async update() {
    this.logger.log(`왁물원 인기글 목록 업데이트 시작`);
    const articles = await this.navercafeService.getPopularArticles();
    const menus = await this.navercafeService.getMenus();

    const entities = articles.map(
      (article) =>
        new PopularArticle({
          articleId: article.articleId,
          publishedTimestamp: new Date(article.writeDateTimestamp),
          lastCommentTimestamp: new Date(article.lastCommentDateTimestamp),
          subject: article.subject,
          nickname: article.nickname,
          memberKey: article.memberKey,
          menuId: article.menuId,
          menuName:
            menus.find((menu) => menu.menuId === article.menuId).menuName || '',
          readCount: article.readCount,
          commentCount: article.commentCount,
          upCount: article.upCount,
          representImage: article.representImage,
          representImageType: article.representImageType,
          imageCount: article.imageCount,
          totalScore: article.totalScore,
        }),
    );
    this.logger.log(`왁물원 인기글 업데이트 완료 (${entities.length}개)`);
    return this.popularArticleRepository.upsert(entities, ['articleId']);
  }
}
