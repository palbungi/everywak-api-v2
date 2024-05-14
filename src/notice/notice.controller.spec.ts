import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MemberService } from 'src/member/member.service';
import { NavercafeService } from 'src/navercafe/navercafe.service';
import { Repository } from 'typeorm';
import { MemberNotice } from './entities/member-notice.entity';
import { NoticeController } from './notice.controller';
import { NoticeService } from './notice.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('NoticeController', () => {
  let controller: NoticeController;
  let memberNoticeRepository: MockRepository<MemberNotice>;
  let navercafeService = {
    getArticleList: jest.fn(),
  };
  let memberService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoticeController],
      
      providers: [
        NoticeService,
        {
          provide: getRepositoryToken(MemberNotice),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
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

    controller = module.get<NoticeController>(NoticeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
