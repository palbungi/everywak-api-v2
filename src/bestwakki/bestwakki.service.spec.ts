import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';
import { TypeOrmConfigService } from 'src/config/typeorm.config';
import youtubeConfig from 'src/config/youtube.config';
import { NavercafeModule } from 'src/navercafe/navercafe.module';
import { DataSource } from 'typeorm';
import { BestwakkiService } from './bestwakki.service';
import { PopularArticle } from './entities/popular-article.entity';

describe('BestwakkiService', () => {
  let service: BestwakkiService;
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
        TypeOrmModule.forFeature([PopularArticle]),
        NavercafeModule,
      ],
      providers: [BestwakkiService],
    }).compile();

    service = module.get<BestwakkiService>(BestwakkiService);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('인기글 갱신', async () => {
    expect((await service.update()).identifiers).toBeInstanceOf(Array);
    expect((await service.getAll()).length).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
