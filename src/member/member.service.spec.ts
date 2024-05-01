import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { YoutubeService } from 'src/youtube/youtube.service';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { MemberService } from './member.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('MemberService', () => {
  let service: MemberService;
  let memberRepository: MockRepository<Member>;
  let youtubeService = {
    getChannel: jest.fn().mockResolvedValue({
      id: 'id',
      title: 'title',
      description: 'description',
      customUrl: 'customUrl',
      publishedAt: 'publishedAt',
      thumbnails: {
        default: {
          url: 'url',
          width: 1,
          height: 1,
        },
        medium: {
          url: 'url',
          width: 1,
          height: 1,
        },
        high: {
          url: 'url',
          width: 1,
          height: 1,
        },
      },
      country: 'country',
      viewCount: 1,
      subscriberCount: 1,
      hiddenSubscriberCount: true,
      videoCount: 1,
      keywords: 'keywords',
      topicIds: ['topicIds'],
      topicCategories: ['topicCategories'],
    }),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemberService,
        {
          provide: getRepositoryToken(Member),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: YoutubeService,
          useValue: youtubeService,
        },
      ],
    }).compile();

    service = module.get<MemberService>(MemberService);
    memberRepository = module.get<MockRepository<Member>>(
      getRepositoryToken(Member),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
