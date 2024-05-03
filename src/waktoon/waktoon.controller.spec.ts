import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NavercafeService } from 'src/navercafe/navercafe.service';
import { DataSource, Repository } from 'typeorm';
import { WaktoonArticle } from './entities/waktoon-article.entity';
import { WaktoonAuthor } from './entities/waktoon-author.entity';
import { WaktoonEpisodeChart } from './entities/waktoon-episode-chart.entity';
import { WaktoonEpisodePopularity } from './entities/waktoon-episode-popularity.entity';
import { WaktoonEpisode } from './entities/waktoon-episode.entity';
import { WaktoonSeries } from './entities/waktoon-series.entity';
import { WaktoonController } from './waktoon.controller';
import { WaktoonService } from './waktoon.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('WaktoonController', () => {
  let controller: WaktoonController;
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
  let dataSource: DataSource;

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
      controllers: [WaktoonController],
    }).compile();

    controller = module.get<WaktoonController>(WaktoonController);
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
    expect(controller).toBeDefined();
  });
});
