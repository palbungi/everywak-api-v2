import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NavercafeService } from 'src/navercafe/navercafe.service';
import { FindOptionsOrder, FindOptionsWhere, ILike, Repository } from 'typeorm';
import {
  OrderBy as EpisodeChartOrderBy,
  SearchEpisodeChartDto,
} from './dto/search-episode-chart.dto';
import {
  OrderBy as EpisodeOrderBy,
  SearchTarget as EpisodeSearchTarget,
  SearchEpisodeDto,
} from './dto/search-episode.dto';
import { WaktoonArticle } from './entities/waktoon-article.entity';
import { WaktoonAuthor } from './entities/waktoon-author.entity';
import { WaktoonEpisodeChart } from './entities/waktoon-episode-chart.entity';
import { WaktoonEpisodePopularity } from './entities/waktoon-episode-popularity.entity';
import { WaktoonEpisode } from './entities/waktoon-episode.entity';
import { WaktoonSeries } from './entities/waktoon-series.entity';
import { WaktoonService } from './waktoon.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('WaktoonService', () => {
  let service: WaktoonService;
  let waktoonArticleRepository: MockRepository<WaktoonArticle>;
  let waktoonAuthorRepository: MockRepository<WaktoonAuthor>;
  let waktoonEpisodeRepository: MockRepository<WaktoonEpisode>;
  let waktoonEpisodePopularityRepository: MockRepository<WaktoonEpisodePopularity>;
  let waktoonEpisodeChartRepository: MockRepository<WaktoonEpisodeChart>;
  let waktoonSeriesRepository: MockRepository<WaktoonSeries>;
  const navercafeService = {
    getArticles: jest.fn(),
    getAllArticles: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WaktoonService,
        {
          provide: NavercafeService,
          useValue: navercafeService,
        },
        {
          provide: getRepositoryToken(WaktoonArticle),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(WaktoonAuthor),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(WaktoonEpisode),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(WaktoonEpisodePopularity),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(WaktoonEpisodeChart),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(WaktoonSeries),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WaktoonService>(WaktoonService);
    waktoonArticleRepository = module.get<MockRepository<WaktoonArticle>>(
      getRepositoryToken(WaktoonArticle),
    );
    waktoonAuthorRepository = module.get<MockRepository<WaktoonAuthor>>(
      getRepositoryToken(WaktoonAuthor),
    );
    waktoonEpisodeRepository = module.get<MockRepository<WaktoonEpisode>>(
      getRepositoryToken(WaktoonEpisode),
    );
    waktoonEpisodePopularityRepository = module.get<
      MockRepository<WaktoonEpisodePopularity>
    >(getRepositoryToken(WaktoonEpisodePopularity));
    waktoonEpisodeChartRepository = module.get<
      MockRepository<WaktoonEpisodeChart>
    >(getRepositoryToken(WaktoonEpisodeChart));
    waktoonSeriesRepository = module.get<MockRepository<WaktoonSeries>>(
      getRepositoryToken(WaktoonSeries),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllArticles()', () => {
    it('should call waktoonArticleRepository.find() with correct arguments', async () => {
      await service.findAllArticles();
      expect(waktoonArticleRepository.find).toHaveBeenCalled();
    });
  });

  describe('findAllAuthors()', () => {
    it('should call waktoonAuthorRepository.find() with correct arguments', async () => {
      await service.findAllAuthors();
      expect(waktoonAuthorRepository.find).toHaveBeenCalled();
    });
  });

  describe('findAllEpisodes()', () => {
    it('should call waktoonEpisodeRepository.find() with correct arguments', async () => {
      await service.findAllEpisodes();
      expect(waktoonEpisodeRepository.find).toHaveBeenCalled();
    });
  });

  describe('getEpisodeChart()', () => {
    it('should call waktoonEpisodeChartRepository.find() with correct arguments', async () => {
      const dto = new SearchEpisodeChartDto({
        duration: 'hourly',
        orderBy: 'read',
        perPage: 30,
        page: 1,
      });
      const orderBy: Record<
        EpisodeChartOrderBy,
        FindOptionsOrder<WaktoonEpisodeChart>
      > = {
        read: { increasedReadCount: 'DESC' },
        comment: { increasedCommentCount: 'DESC' },
        up: { increasedUpCount: 'DESC' },
      };

      await service.getEpisodeChart(dto);
      expect(waktoonEpisodeChartRepository.find).toHaveBeenCalledWith({
        where: {
          duration: dto.duration,
        },
        order: orderBy[dto.orderBy],
        take: dto.perPage,
        skip: (dto.page - 1) * dto.perPage,
        relations: ['episode', 'episode.article'],
      });
    });

    it('should call waktoonEpisodeChartRepository.find() with correct arguments when orderBy is not specified', async () => {
      const dto = new SearchEpisodeChartDto({
        duration: 'hourly',
        perPage: 30,
        page: 1,
      });
      const orderBy: Record<
        EpisodeChartOrderBy,
        FindOptionsOrder<WaktoonEpisodeChart>
      > = {
        read: { increasedReadCount: 'DESC' },
        comment: { increasedCommentCount: 'DESC' },
        up: { increasedUpCount: 'DESC' },
      };

      await service.getEpisodeChart(dto);
      expect(waktoonEpisodeChartRepository.find).toHaveBeenCalledWith({
        where: {
          duration: dto.duration,
        },
        order: orderBy.read,
        take: dto.perPage,
        skip: (dto.page - 1) * dto.perPage,
        relations: ['episode', 'episode.article'],
      });
    });

    it('should call waktoonEpisodeChartRepository.find() with correct arguments when page is 2', async () => {
      const dto = new SearchEpisodeChartDto({
        duration: 'hourly',
        perPage: 30,
        page: 2,
      });
      const orderBy: Record<
        EpisodeChartOrderBy,
        FindOptionsOrder<WaktoonEpisodeChart>
      > = {
        read: { increasedReadCount: 'DESC' },
        comment: { increasedCommentCount: 'DESC' },
        up: { increasedUpCount: 'DESC' },
      };

      await service.getEpisodeChart(dto);
      expect(waktoonEpisodeChartRepository.find).toHaveBeenCalledWith({
        where: {
          duration: dto.duration,
        },
        order: orderBy.read,
        take: dto.perPage,
        skip: (dto.page - 1) * dto.perPage,
        relations: ['episode', 'episode.article'],
      });
    });

    it('should call waktoonEpisodeChartRepository.find() with correct arguments when duration is not specified', async () => {
      const dto = new SearchEpisodeChartDto({
        orderBy: 'read',
        perPage: 30,
        page: 1,
      });
      const orderBy: Record<
        EpisodeChartOrderBy,
        FindOptionsOrder<WaktoonEpisodeChart>
      > = {
        read: { increasedReadCount: 'DESC' },
        comment: { increasedCommentCount: 'DESC' },
        up: { increasedUpCount: 'DESC' },
      };

      await expect(service.getEpisodeChart(dto)).rejects.toThrow();
    });
  });

  describe('findEpisodes()', () => {
    it('should call waktoonEpisodeRepository.find() with correct arguments', async () => {
      const dto: SearchEpisodeDto = new SearchEpisodeDto();
      await service.findEpisodes(dto);

      const orderBy: Record<
        EpisodeOrderBy,
        FindOptionsOrder<WaktoonEpisode>
      > = {
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
      expect(waktoonEpisodeRepository.find).toHaveBeenCalledWith({
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
    });
  });
});
