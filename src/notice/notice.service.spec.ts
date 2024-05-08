import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Member } from 'src/member/entities/member.entity';
import { Social } from 'src/member/entities/social.entity';
import { MemberService } from 'src/member/member.service';
import { ArticleListItem } from 'src/navercafe/dto/article-list.dto';
import { NavercafeService } from 'src/navercafe/navercafe.service';
import { Repository } from 'typeorm';
import { SearchMemberNoticeDto } from './dto/search-member-notice.dto';
import { MemberNotice } from './entities/member-notice.entity';
import { NoticeService } from './notice.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockMembers = [
  new Member({
    id: 'a',
    social: [
      new Social({
        type: 'navercafe',
        id: 'test',
      }),
    ],
  }),
];
const mockArticleList = [
  {
    articleId: 1,
    memberKey: 'test',
    writeDateTimestamp: 0,
    subject: 'test',
    menuId: 1,
    menuName: 'test',
    readCount: 0,
    commentCount: 0,
    likeItCount: 0,
  },
  {
    articleId: 2,
    memberKey: 'test2',
    writeDateTimestamp: 0,
    subject: 'test',
    menuId: 1,
    menuName: 'test',
    readCount: 0,
    commentCount: 0,
    likeItCount: 0,
  },
  {
    articleId: 3,
    memberKey: 'test',
    writeDateTimestamp: 0,
    subject: 'test',
    menuId: 1,
    menuName: 'test',
    readCount: 0,
    commentCount: 0,
    likeItCount: 0,
  },
];

describe('NoticeService', () => {
  let service: NoticeService;
  let memberNoticeRepository: MockRepository<MemberNotice>;
  let navercafeService = {
    getArticleList: jest.fn().mockReturnValue({
      articleList: mockArticleList,
    }),
  };
  let memberService = {
    findAll: jest.fn().mockReturnValue(mockMembers),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<NoticeService>(NoticeService);
    memberNoticeRepository = module.get<MockRepository<MemberNotice>>(
      getRepositoryToken(MemberNotice),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of notices', async () => {
      const result = [{ id: 1, title: 'test', content: 'test' }];
      memberNoticeRepository.find.mockReturnValue(result);

      expect(await service.findAll()).toEqual(result);
    });

    it('should call find() with the correct arguments', async () => {
      await service.findAll();
      expect(memberNoticeRepository.find).toHaveBeenCalled();
    });
  });

  describe('find', () => {
    it('should return notice array', async () => {
      const result = [{ id: 1, title: 'test', content: 'test' }];
      memberNoticeRepository.find.mockReturnValue(result);

      expect(await service.find(new SearchMemberNoticeDto({}))).toEqual(result);
    });

    it('should call find() with the correct arguments', async () => {
      await service.find(new SearchMemberNoticeDto({}));
      expect(memberNoticeRepository.find).toHaveBeenCalled();
    });

    it('should call find() with the correct arguments', async () => {
      const dto = new SearchMemberNoticeDto({ memberId: 'test' });
      await service.find(dto);
      expect(memberNoticeRepository.find).toHaveBeenCalledWith({
        where: {
          member: { id: dto.memberId },
        },
        order: { publishedTimestamp: 'DESC' },
        take: 30,
        skip: 0,
        relations: ['member'],
      });
    });

    it('should call find() with page 2', async () => {
      const dto = new SearchMemberNoticeDto({ memberId: 'test', page: 2 });
      await service.find(dto);
      expect(memberNoticeRepository.find).toHaveBeenCalledWith({
        where: {
          member: { id: dto.memberId },
        },
        order: { publishedTimestamp: 'DESC' },
        take: 30,
        skip: 30,
        relations: ['member'],
      });
    });
  });

  describe('update', () => {
    it('should call upsert() with the correct arguments', async () => {
      await service.update();
      expect(memberNoticeRepository.upsert).toHaveBeenCalled();
    });
    it('should call upsert() with the correct arguments', async () => {
      await service.update();
      expect(memberNoticeRepository.upsert).toHaveBeenCalledWith(
        expect.any(Array<MemberNotice>),
        ['articleId'],
      );
    });
    it('should call memberService.findAll()', async () => {
      await service.update();
      expect(memberService.findAll).toHaveBeenCalled();
    });
    it('should filter out notices that non-member wrote', async () => {
      await service.update();
      expect(memberNoticeRepository.upsert).toHaveBeenCalledWith(
        mockArticleList.filter((article) =>
          mockMembers.some(
            (member) =>
              member.social.find(
                (socialItem) => socialItem.type === 'navercafe',
              )?.id === article.memberKey,
          ),
        ).map((article) => new MemberNotice({
          articleId: article.articleId,
          publishedTimestamp: new Date(article.writeDateTimestamp),
          subject: article.subject,
          member: mockMembers.find(
            (member) =>
              member.social.find((social) => social.type === 'navercafe')
                ?.id === article.memberKey,
          ),
          menuId: article.menuId,
          menuName: article.menuName,
          readCount: article.readCount,
          commentCount: article.commentCount,
          upCount: article.likeItCount,
        })),
        ['articleId'],
      );
    });
  });
});
