import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import youtubeConfig from 'src/config/youtube.config';
import { FetchModule } from 'src/fetch/fetch.module';
import { YoutubeController } from './youtube.controller';
import { YoutubeService } from './youtube.service';

describe('YoutubeController', () => {
  let controller: YoutubeController;

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
      controllers: [YoutubeController],
      providers: [YoutubeService],
    }).compile();

    controller = module.get<YoutubeController>(YoutubeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
