import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import youtubeConfig from 'src/config/youtube.config';
import { FetchModule } from 'src/fetch/fetch.module';
import { YoutubeService } from './youtube.service';

describe('YoutubeService', () => {
  let service: YoutubeService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [youtubeConfig],
          envFilePath: '.env.test.local',
          isGlobal: true,
        }),
        FetchModule,
      ],
      providers: [YoutubeService],
    }).compile();

    service = module.get<YoutubeService>(YoutubeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
