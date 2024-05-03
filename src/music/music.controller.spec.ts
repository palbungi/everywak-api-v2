import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Member } from 'src/member/entities/member.entity';
import { MemberService } from 'src/member/member.service';
import { VideoService } from 'src/video/video.service';
import { YoutubeService } from 'src/youtube/youtube.service';
import { Repository } from 'typeorm';
import { MusicChart } from './entities/music-chart.entity';
import { Music } from './entities/music.entity';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('MusicController', () => {
  let controller: MusicController;
  let musicRepository: MockRepository<Music>;
  let musicChartRepository: MockRepository<MusicChart>;
  let memberService = {
    findAll: jest
      .fn()
      .mockResolvedValue(
        new Promise((r) =>
          r([new Member({ id: 'member1' }), new Member({ id: 'member2' })]),
        ),
      ),
  };
  let videoService = {
    findAll: jest.fn(),
    findViewCount: jest.fn(),
    getVideo: jest.fn(),
  };
  let youtubeService = {
    getPlaylistItems: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MusicController],
      providers: [
        MusicService,
        {
          provide: getRepositoryToken(Music),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(MusicChart),
          useValue: {
            find: jest.fn(),
            manager: {
              transaction: jest.fn(),
            },
          },
        },
        { provide: MemberService, useValue: memberService },
        { provide: VideoService, useValue: videoService },
        { provide: YoutubeService, useValue: youtubeService },
      ],
    }).compile();

    controller = module.get<MusicController>(MusicController);
    musicRepository = module.get<MockRepository<Music>>(
      getRepositoryToken(Music),
    );
    musicChartRepository = module.get<MockRepository<MusicChart>>(
      getRepositoryToken(MusicChart),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
