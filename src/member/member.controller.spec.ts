import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';
import { TypeOrmConfigService } from 'src/config/typeorm.config';
import youtubeConfig from 'src/config/youtube.config';
import { LiveChange } from 'src/live/entities/live-change.entity';
import { Live } from 'src/live/entities/live.entity';
import { OBI } from 'src/obi/entities/obi.entity';
import { YoutubeModule } from 'src/youtube/youtube.module';
import { DataSource } from 'typeorm';
import { LivePlatform } from './entities/livePlatform.entity';
import { Member } from './entities/member.entity';
import { Profile } from './entities/profile.entity';
import { Social } from './entities/social.entity';
import { YoutubeChannel } from './entities/youtubeChannel.entity';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

describe('MemberController', () => {
  let controller: MemberController;
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
          Member,
          Profile,
          LivePlatform,
          Social,
          YoutubeChannel,
          OBI,
          Live,
          LiveChange,
        ]),
        YoutubeModule,
      ],
      controllers: [MemberController],
      providers: [MemberService],
    }).compile();

    controller = module.get<MemberController>(MemberController);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  afterAll(async () => {
    await dataSource.destroy();
  });
});
