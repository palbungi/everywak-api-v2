import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';
import { TypeOrmConfigService } from 'src/config/typeorm.config';
import youtubeConfig from 'src/config/youtube.config';
import { MemberModule } from 'src/member/member.module';
import { YoutubeModule } from 'src/youtube/youtube.module';
import { DataSource } from 'typeorm';
import { VideoViewCount } from './entities/video-view-count.entity';
import { Video } from './entities/video.entity';
import { VideoService } from './video.service';

describe('VideoService', () => {
  let service: VideoService;
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
        TypeOrmModule.forFeature([Video, VideoViewCount]),
        MemberModule,
        YoutubeModule,
      ],
      providers: [VideoService],
    }).compile();

    service = module.get<VideoService>(VideoService);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
