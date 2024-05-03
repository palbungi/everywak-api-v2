import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MemberService } from 'src/member/member.service';
import { NavercafeService } from 'src/navercafe/navercafe.service';
import { Repository } from 'typeorm';
import { OBI } from './entities/obi.entity';
import { ObiController } from './obi.controller';
import { ObiService } from './obi.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('ObiController', () => {
  let controller: ObiController;
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
      controllers: [ObiController],
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

    controller = module.get<ObiController>(ObiController);
    obiRepository = module.get<MockRepository<OBI>>(getRepositoryToken(OBI));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
