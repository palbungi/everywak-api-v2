import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MemberService } from 'src/member/member.service';
import { YoutubeService } from 'src/youtube/youtube.service';
import { Repository } from 'typeorm';
import { VideoViewCount } from './entities/video-view-count.entity';
import { Video } from './entities/video.entity';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('VideoController', () => {
  let controller: VideoController;
  let videoRepository: MockRepository<Video>;
  let videoViewCountRepository: MockRepository<VideoViewCount>;
  let memserService = {
    findAll: jest.fn(),
  };
  let youtubeService = {
    getVideo: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoController],
      providers: [
        VideoService,
        {
          provide: getRepositoryToken(Video),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            manager: {
              transaction: jest.fn(),
            },
          },
        },
        {
          provide: getRepositoryToken(VideoViewCount),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            manager: {
              transaction: jest.fn(),
            },
          },
        },
        {
          provide: MemberService,
          useValue: memserService,
        },
        {
          provide: YoutubeService,
          useValue: youtubeService,
        },
      ],
    }).compile();

    controller = module.get<VideoController>(VideoController);
    videoRepository = module.get<MockRepository<Video>>(
      getRepositoryToken(Video),
    );
    videoViewCountRepository = module.get<MockRepository<VideoViewCount>>(
      getRepositoryToken(VideoViewCount),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
