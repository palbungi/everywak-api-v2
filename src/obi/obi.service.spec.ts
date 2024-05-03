import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MemberService } from 'src/member/member.service';
import { NavercafeService } from 'src/navercafe/navercafe.service';
import { Repository } from 'typeorm';
import { OBI } from './entities/obi.entity';
import { ObiService } from './obi.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('ObiService', () => {
  let service: ObiService;
  let obiRepository: MockRepository<OBI>;
  let navercafeService = {
    getArticleList: jest.fn(),
    getArticle: jest.fn(),
  };
  let memberService = {
    findAll: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ObiService,
        {
          provide: getRepositoryToken(OBI),
          useValue: {
            find: jest.fn(),
            upsert: jest.fn(),
          },
        },
        {
          provide: NavercafeService,
          useValue: navercafeService,
        },
        {
          provide: MemberService,
          useValue: memberService,
        },
      ],
    }).compile();

    service = module.get<ObiService>(ObiService);
    obiRepository = module.get<MockRepository<OBI>>(getRepositoryToken(OBI));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
