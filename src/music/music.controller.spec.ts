import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';
import { TypeOrmConfigService } from 'src/config/typeorm.config';
import youtubeConfig from 'src/config/youtube.config';
import { MemberModule } from 'src/member/member.module';
import { VideoModule } from 'src/video/video.module';
import { DataSource } from 'typeorm';
import { MusicChart } from './entities/music-chart.entity';
import { Music } from './entities/music.entity';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';

describe('MusicController', () => {
  let controller: MusicController;
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
        TypeOrmModule.forFeature([Music, MusicChart]),
        MemberModule,
        VideoModule,
      ],
      controllers: [MusicController],
      providers: [MusicService],
    }).compile();

    controller = module.get<MusicController>(MusicController);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
