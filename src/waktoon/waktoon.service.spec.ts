import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';
import { TypeOrmConfigService } from 'src/config/typeorm.config';
import youtubeConfig from 'src/config/youtube.config';
import { NavercafeModule } from 'src/navercafe/navercafe.module';
import { DataSource } from 'typeorm';
import { WaktoonArticle } from './entities/waktoon-article.entity';
import { WaktoonAuthor } from './entities/waktoon-author.entity';
import { WaktoonEpisodeChart } from './entities/waktoon-episode-chart.entity';
import { WaktoonEpisodePopularity } from './entities/waktoon-episode-popularity.entity';
import { WaktoonEpisode } from './entities/waktoon-episode.entity';
import { WaktoonSeries } from './entities/waktoon-series.entity';
import { WaktoonService } from './waktoon.service';

describe('WaktoonService', () => {
  let service: WaktoonService;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [databaseConfig, youtubeConfig],
          envFilePath: '.env.test.local',
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useClass: TypeOrmConfigService,
        }),
        TypeOrmModule.forFeature([
          WaktoonArticle,
          WaktoonAuthor,
          WaktoonSeries,
          WaktoonEpisode,
          WaktoonEpisodePopularity,
          WaktoonEpisodeChart,
        ]),
        NavercafeModule,
      ],
      providers: [WaktoonService],
    }).compile();

    service = module.get<WaktoonService>(WaktoonService);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
