import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';
import { TypeOrmConfigService } from 'src/config/typeorm.config';
import youtubeConfig from 'src/config/youtube.config';
import { NavercafeModule } from 'src/navercafe/navercafe.module';
import { BestwakkiService } from './bestwakki.service';
import { PopularArticle } from './entities/popular-article.entity';

describe('BestwakkiService', () => {
  let service: BestwakkiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [databaseConfig, youtubeConfig],
          envFilePath:
            process.env.NODE_ENV === 'dev'
              ? '.env.development.local'
              : process.env.NODE_ENV === 'test'
              ? '.env.test.local'
              : '.env.production.local',
          isGlobal: true,
        }),
        TypeOrmModule.forFeature([PopularArticle]),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useClass: TypeOrmConfigService,
        }),
        NavercafeModule, 
      ],
      providers: [BestwakkiService],
    }).compile();

    service = module.get<BestwakkiService>(BestwakkiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('인기글 갱신', async () => {
    expect((await service.update()).identifiers).toBeInstanceOf(Array);
  });
});
