import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NavercafeService } from 'src/navercafe/navercafe.service';
import {
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  In,
  LessThan,
  Repository,
} from 'typeorm';
import { InsertSeriesDto } from './dto/insert-series.dto';
import {
  SearchTarget as AuthorSearchTarget,
  SearchAuthorDto,
} from './dto/search-author.dto';
import {
  OrderBy as EpisodeChartOrderBy,
  SearchEpisodeChartDto,
} from './dto/search-episode-chart.dto';
import {
  OrderBy as EpisodeOrderBy,
  SearchTarget as EpisodeSearchTarget,
  SearchEpisodeDto,
} from './dto/search-episode.dto';
import {
  OrderBy as SeriesOrderBy,
  SearchTarget as SeriesSearchTarget,
  SearchSeriesDto,
} from './dto/search-series.dto';
import { WaktoonEpisodeChartItem } from './dto/waktoon-episode-chart-item.dto';
import { WaktoonArticle } from './entities/waktoon-article.entity';
import { WaktoonAuthor } from './entities/waktoon-author.entity';
import { WaktoonEpisodePopularity } from './entities/waktoon-episode-popularity.entity';
import { WaktoonEpisode } from './entities/waktoon-episode.entity';
import { WaktoonSeries } from './entities/waktoon-series.entity';

@Injectable()
export class WaktoonService {
  static readonly MENU_BEST = 501;
  static readonly MENU_GENERAL = 380;
  static readonly MENU_HUBO = 500;

  @Inject(NavercafeService)
  private readonly navercafeService: NavercafeService;

  @InjectRepository(WaktoonArticle)
  private readonly waktoonArticleRepository: Repository<WaktoonArticle>;

  @InjectRepository(WaktoonAuthor)
  private readonly waktoonAuthorRepository: Repository<WaktoonAuthor>;

  @InjectRepository(WaktoonEpisode)
  private readonly waktoonEpisodeRepository: Repository<WaktoonEpisode>;

  @InjectRepository(WaktoonSeries)
  private readonly waktoonSeriesRepository: Repository<WaktoonSeries>;

  @InjectRepository(WaktoonEpisodePopularity)
  private readonly waktoonEpisodePopularityRepository: Repository<WaktoonEpisodePopularity>;

  findAllArticles() {
    return this.waktoonArticleRepository.find({
      relations: ['member'],
    });
  }

  findAllAuthors() {
    return this.waktoonAuthorRepository.find();
  }

  findAllEpisodes() {
    return this.waktoonEpisodeRepository.find({
      relations: ['article', 'member'],
    });
  }

  async findAllSeries() {
    const series = await this.waktoonSeriesRepository.find({
      relations: ['episodes', 'members', 'episodes.article'],
    });
    series.forEach((s) => {
      s.episodes.sort((a, b) => a.episodeNumber - b.episodeNumber);
    });
    return series;
  }

  async getEpisodeChart(dto: SearchEpisodeChartDto) {
    const before = parseInt(this.generateDateHourString(new Date(dto.beginAt)));
    const after = parseInt(this.generateDateHourString(new Date(dto.endAt)));

    const popularity = await this.waktoonEpisodePopularityRepository.find({
      where: {
        time: LessThan(after),
      },
      relations: ['episode'],
    });

    const beforeEpisodes: Record<string, WaktoonEpisodePopularity> = {};
    const afterEpisodes: Record<string, WaktoonEpisodePopularity> = {};

    popularity.forEach((p) => {
      if (
        p.time <= before &&
        (!beforeEpisodes[p.episode.id] ||
          beforeEpisodes[p.episode.id].time < p.time)
      ) {
        beforeEpisodes[p.episode.id] = p;
      }
      if (
        p.time <= after &&
        (!afterEpisodes[p.episode.id] ||
          afterEpisodes[p.episode.id].time < p.time)
      ) {
        afterEpisodes[p.episode.id] = p;
      }
    });

    const chart: WaktoonEpisodeChartItem[] = [];

    Object.entries(afterEpisodes).forEach(([id, afterEpisode]) => {
      const beforeEpisode = beforeEpisodes[id];
      if (!beforeEpisode) {
        return;
      }
      const diff = {
        diffReadCount: afterEpisode.readCount - beforeEpisode.readCount,
        diffCommentCount:
          afterEpisode.commentCount - beforeEpisode.commentCount,
        diffUpCount: afterEpisode.upCount - beforeEpisode.upCount,
      };
      chart.push(
        new WaktoonEpisodeChartItem({
          ...afterEpisode,
          ...diff,
        }),
      );
    });

    switch (dto.orderBy) {
      case 'read':
        chart.sort((a, b) => b.diffReadCount - a.diffReadCount);
        break;
      case 'comment':
        chart.sort((a, b) => b.diffCommentCount - a.diffCommentCount);
        break;
      case 'up':
        chart.sort((a, b) => b.diffUpCount - a.diffUpCount);
        break;
    }

    return chart.slice((dto.page - 1) * dto.perPage, dto.page * dto.perPage);
  }

  async findEpisodes(dto: SearchEpisodeDto) {
    const orderBy: Record<EpisodeOrderBy, FindOptionsOrder<WaktoonEpisode>> = {
      time: { article: { publishedTimestamp: 'DESC' } },
      time_oldest: { article: { publishedTimestamp: 'ASC' } },
      read: { article: { readCount: 'DESC' } },
      comment: { article: { commentCount: 'DESC' } },
      up: { article: { upCount: 'DESC' } },
    };

    const boardName = {
      best: WaktoonService.MENU_BEST,
      general: WaktoonService.MENU_GENERAL,
      hubo: WaktoonService.MENU_HUBO,
    };

    const where: Record<
      EpisodeSearchTarget,
      FindOptionsWhere<WaktoonEpisode>
    > = {
      title: { title: ILike(`%${dto.keyword}%`) },
      author: { member: { memberKey: dto.keyword } },
      board: boardName[dto.keyword]
        ? { article: { menuId: boardName[dto.keyword] } }
        : {},
      articleId: { article: { articleId: parseInt(dto.keyword) } },
      parent: { series: { id: dto.keyword } },
    };

    return this.waktoonEpisodeRepository.find({
      select: [
        'id',
        'article',
        'title',
        'member',
        'description',
        'episodeNumber',
        'series',
      ],
      where: where[dto.searchTarget],
      order: orderBy[dto.orderBy],
      take: dto.perPage,
      skip: (dto.page - 1) * dto.perPage,
      relations: ['member', 'article', 'series'],
    });
  }

  async findSeries(dto: SearchSeriesDto) {
    const orderBy: Record<SeriesOrderBy, FindOptionsOrder<WaktoonSeries>> = {
      time: { publishedTimestamp: 'DESC' },
      time_oldest: { publishedTimestamp: 'ASC' },
      read: { readCount: 'DESC' },
      comment: { commentCount: 'DESC' },
      up: { upCount: 'DESC' },
    };

    const where: Record<SeriesSearchTarget, FindOptionsWhere<WaktoonSeries>> = {
      title: { title: ILike(`%${dto.keyword}%`) },
      author: { authorName: ILike(`%${dto.keyword}%`) },
      id: { id: dto.keyword },
    };

    return this.waktoonSeriesRepository.find({
      select: [
        'id',
        'updatedTimestamp',
        'publishedTimestamp',
        'lastPublishedTimestamp',
        'isBest',
        'title',
        'authorName',
        'members',
        'description',
        'thumbnails',
        'episodeLength',
        'readCount',
        'commentCount',
        'upCount',
        'episodes',
      ],
      where: where[dto.searchTarget],
      order: orderBy[dto.orderBy],
      take: dto.perPage,
      skip: (dto.page - 1) * dto.perPage,
      relations: ['members', 'episodes'],
    });
  }

  async findSeriesById(id: string) {
    return this.waktoonSeriesRepository.find({
      select: [
        'id',
        'updatedTimestamp',
        'publishedTimestamp',
        'lastPublishedTimestamp',
        'isBest',
        'title',
        'authorName',
        'members',
        'description',
        'thumbnails',
        'episodeLength',
        'readCount',
        'commentCount',
        'upCount',
        'episodes',
      ],
      where: { id },
      take: 1,
      relations: ['members', 'episodes'],
    });
  }

  findAuthors(dto: SearchAuthorDto) {
    const where: Record<AuthorSearchTarget, FindOptionsWhere<WaktoonAuthor>> = {
      nickname: {
        nickname: ILike(`%${dto.keyword}%`),
      },
      memberKey: {
        memberKey: dto.keyword,
      },
    };

    return this.waktoonAuthorRepository.find({
      select: [
        'memberKey',
        'nickname',
        'profileImage',
        'articleCount',
        'readCount',
        'commentCount',
        'upCount',
      ],
      where: where[dto.searchTarget],
      order: {
        nickname: 'ASC',
      },
      take: dto.perPage,
      skip: (dto.page - 1) * dto.perPage,
    });
  }

  findAuthorByMemberKeys(memberKeys: string[]) {
    return this.waktoonAuthorRepository.find({
      where: {
        memberKey: In(memberKeys),
      },
    });
  }

  generateDateHourString(date: Date) {
    const year = date.getFullYear() % 100;
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();

    return `${year * 1000000 + month * 10000 + day * 100 + hour}`;
  }

  async saveEpisodePopularity() {
    const episodes = await this.findAllEpisodes();

    const now = new Date();
    const dateHourString = this.generateDateHourString(now);
    const episodePopularities = episodes.map((episode) => {
      return new WaktoonEpisodePopularity({
        id: `${dateHourString}:${episode.id}`,
        episode,
        time: parseInt(dateHourString),
        readCount: episode.article.readCount,
        commentCount: episode.article.commentCount,
        upCount: episode.article.upCount,
      });
    });

    await this.waktoonEpisodePopularityRepository.manager.transaction(
      async (manager) => {
        while (episodePopularities.length > 0) {
          const chunk = episodePopularities.splice(0, 1000);
          await manager.upsert(WaktoonEpisodePopularity, chunk, ['id']);
        }
      },
    );

    return 200;
  }

  async updateArticles() {
    let skipped = 0;

    const bestArticles = await this.navercafeService.getAllArticleList(
      WaktoonService.MENU_BEST,
    );
    // const generalArticles = await this.navercafeService.getAllArticleList(
    //   WaktoonService.MENU_GENERAL,
    // );
    // const huboArticles = await this.navercafeService.getAllArticleList(
    //   WaktoonService.MENU_HUBO,
    // );

    const authors: WaktoonAuthor[] = await this.findAllAuthors();
    const articles: WaktoonArticle[] = [];
    for (const article of [...bestArticles]) {
      if (!authors.find((author) => author.memberKey === article.memberKey)) {
        try {
          const articleItem = await this.navercafeService.getArticle(
            '' + article.articleId,
          );

          const author = new WaktoonAuthor({
            memberKey: article.memberKey,
            nickname: articleItem.article.writer.nick,
            profileImage: articleItem.article.writer.image.url,
          });
          authors.push(author);
        } catch (error) {
          skipped++;
          if (error instanceof UnauthorizedException) {
            // 멤버 공개 게시글 스킵
            continue;
          }
          continue;
          //throw error;
        }
      }

      const waktoonArticle = new WaktoonArticle({
        articleId: article.articleId,
        publishedTimestamp: new Date(article.writeDateTimestamp),
        menuId: article.menuId,
        title: article.subject,
        member: authors.find(
          (author) => author.memberKey === article.memberKey,
        ),
        thumbnails: article.representImage,
        readCount: article.readCount,
        commentCount: article.commentCount,
        upCount: article.likeItCount,
      });

      articles.push(waktoonArticle);
    }
    await this.waktoonArticleRepository.manager.transaction(async (manager) => {
      await manager.upsert(WaktoonAuthor, authors, ['memberKey']);
      while (articles.length > 0) {
        const chunk = articles.splice(0, 500);
        await manager.upsert(WaktoonArticle, chunk, ['articleId']);
      }
    });

    return {
      author: (await this.findAllAuthors()).length,
      article: (await this.findAllArticles()).length,
      skipped,
    };
  }

  async updateEpisodes() {
    const articles = await this.findAllArticles();
    const episodes = await this.findAllEpisodes();

    // 에피소드가 생성되지 않은 게시글
    const newEpisodes = articles
      .filter((a) => !episodes.find((e) => e.article.articleId === a.articleId))
      .map(
        (a) =>
          new WaktoonEpisode({
            article: a,
            title: a.title,
            member: a.member,
            description: '',
          }),
      );

    return await this.waktoonEpisodeRepository.save(newEpisodes);
  }

  async updateAuthors() {
    let skipped = 0;
    const authors: WaktoonAuthor[] = [];
    const articles = await this.findAllArticles();

    for (const article of articles) {
      if (!article.member) {
        continue;
      }
      if (
        !authors.find((author) => author.memberKey === article.member.memberKey)
      ) {
        try {
          const articleItem = await this.navercafeService.getArticle(
            '' + article.articleId,
          );

          const authorsArticles = articles.filter(
            (a) => a.member?.memberKey === article.member.memberKey,
          );
          const author = new WaktoonAuthor({
            memberKey: article.member.memberKey,
            nickname: articleItem.article.writer.nick,
            profileImage: articleItem.article.writer.image.url,
            articleCount: authorsArticles.length,
            readCount: authorsArticles.reduce(
              (acc, cur) => acc + cur.readCount,
              0,
            ),
            commentCount: authorsArticles.reduce(
              (acc, cur) => acc + cur.commentCount,
              0,
            ),
            upCount: authorsArticles.reduce((acc, cur) => acc + cur.upCount, 0),
          });
          authors.push(author);
        } catch (error) {
          skipped++;
          continue;
        }
      }
    }

    return await this.waktoonAuthorRepository.upsert(authors, ['memberKey']);
  }

  async insertSeries(dto: InsertSeriesDto) {
    const series = new WaktoonSeries({
      title: dto.title,
      authorName: dto.authorName,
      members: await this.findAuthorByMemberKeys(dto.members),
      parseRegex: dto.parseRegex,
      description: dto.description,
      thumbnails: dto.thumbnails,
    });
    return await this.waktoonSeriesRepository.save(series);
  }

  async updateSeries() {
    const episodes = await this.findAllEpisodes();
    const series = await this.findAllSeries();

    series.forEach((s) => {
      //remove all episodes
      console.log(s.episodes);
      s.episodes.splice(0, s.episodes.length);

      episodes.forEach((e) => {
        if (e.article.title.match(s.parseRegex)) {
          e.series = s;
          s.episodes.push(e);
        } else if (e.series === s) {
          e.series = null;
        }
      });

      s.publishedTimestamp = s.episodes.reduce((acc, cur) => {
        return acc < cur.article.publishedTimestamp
          ? acc
          : cur.article.publishedTimestamp;
      }, new Date());
      s.lastPublishedTimestamp = s.episodes.reduce((acc, cur) => {
        return acc > cur.article.publishedTimestamp
          ? acc
          : cur.article.publishedTimestamp;
      }, new Date(0));
      s.episodeLength = s.episodes.length;
      s.episodes.sort((a, b) => a.article.articleId - b.article.articleId);
      s.episodes.forEach((e, i) => {
        e.episodeNumber = i + 1;
      });
      s.readCount = s.episodes.reduce(
        (acc, cur) => acc + cur.article.readCount,
        0,
      );
      s.commentCount = s.episodes.reduce(
        (acc, cur) => acc + cur.article.commentCount,
        0,
      );
      s.upCount = s.episodes.reduce((acc, cur) => acc + cur.article.upCount, 0);
      s.isBest = s.episodes.some(
        (e) => e.article.menuId === WaktoonService.MENU_BEST,
      );
      s.lastPublishedTimestamp = s.episodes.reduce((acc, cur) => {
        return acc > cur.article.publishedTimestamp
          ? acc
          : cur.article.publishedTimestamp;
      }, new Date(0));
    });

    await this.waktoonSeriesRepository.manager.transaction(async (manager) => {
      await manager.upsert(WaktoonSeries, series, ['id']);
      await manager.upsert(WaktoonEpisode, episodes, ['id']);
    });

    return {
      series: series.length,
    };
  }

  async updateWaktoon() {
    const resultArticle = await this.updateArticles();

    const resultEpisode = await this.updateEpisodes();
    const resultPopularity = await this.saveEpisodePopularity();
    const resultSeries = await this.updateSeries();

    return {
      article: resultArticle,
      episode: resultEpisode.length,
      popularity: resultPopularity,
      series: resultSeries,
    };
  }

  async updateAll() {
    const resultArticle = await this.updateArticles();

    const resultAuthors = await this.updateAuthors();

    const resultSeries = await this.updateSeries();

    return {
      article: resultArticle,
      authors: resultAuthors,
      series: resultSeries,
    };
  }
}
