import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AfreecaModule } from 'src/afreeca/afreeca.module';
import { AfreecaService } from 'src/afreeca/afreeca.service';
import { MemberModule } from 'src/member/member.module';
import { MemberService } from 'src/member/member.service';
import { YoutubeModule } from 'src/youtube/youtube.module';
import { YoutubeService } from 'src/youtube/youtube.service';
import { Repository } from 'typeorm';
import { LiveChange } from './entities/live-change.entity';
import { Live } from './entities/live.entity';
import { LiveService } from './live.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('LiveService', () => {
  let service: LiveService;
  let liveRepository: MockRepository<Live>;
  let liveChangeRepository: MockRepository<LiveChange>;
  let memberService = {
    findMemberById: jest.fn(),
  };
  let afreecaService = {
    getStation: jest.fn(),
    getStream: jest.fn(),
  };
  let youtubeService = {
    getChannels: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LiveService,
        {
          provide: getRepositoryToken(Live),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(LiveChange),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: MemberService,
          useValue: memberService,
        },
        {
          provide: AfreecaService,
          useValue: afreecaService,
        },
        {
          provide: YoutubeService,
          useValue: youtubeService,
        },
      ],
    }).compile();

    service = module.get<LiveService>(LiveService);
    liveRepository = module.get<MockRepository<Live>>(getRepositoryToken(Live));
    liveChangeRepository = module.get<MockRepository<LiveChange>>(
      getRepositoryToken(LiveChange),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
