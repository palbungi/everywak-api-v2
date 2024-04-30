import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AfreecaModule } from 'src/afreeca/afreeca.module';
import databaseConfig from 'src/config/database.config';
import { TypeOrmConfigService } from 'src/config/typeorm.config';
import youtubeConfig from 'src/config/youtube.config';
import { Member } from 'src/member/entities/member.entity';
import { MemberModule } from 'src/member/member.module';
import { YoutubeModule } from 'src/youtube/youtube.module';
import { DataSource } from 'typeorm';
import { LiveChange } from './entities/live-change.entity';
import { Live } from './entities/live.entity';
import { LiveController } from './live.controller';
import { LiveService } from './live.service';

describe('LiveController', () => {
  let controller: LiveController;
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
        TypeOrmModule.forFeature([Live, LiveChange, Member]),
        MemberModule,
        AfreecaModule,
        YoutubeModule,
      ],
      controllers: [LiveController],
      providers: [LiveService],
    }).compile();

    controller = module.get<LiveController>(LiveController);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
