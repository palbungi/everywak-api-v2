import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NavercafeService } from 'src/navercafe/navercafe.service';
import { Repository } from 'typeorm';
import { BestwakkiService } from './bestwakki.service';
import { SearchArticleDto } from './dto/search-article.dto';
import { PopularArticle } from './entities/popular-article.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('BestwakkiService', () => {
  let service: BestwakkiService;
  let popularArticleRepository: MockRepository<PopularArticle>;
  const navercafeService = {
    getPopularArticles: jest.fn().mockResolvedValue([
      {
        statDate: 'statDate',
        cafeId: 1,
        articleId: 1,
        subject: 'subject',
        nickname: 'nickname',
        memberKey: 'memberKey',
        memberLevel: 1,
        memberLevelIconId: 1,
        commentCount: 1,
        formattedCommentCount: 'formattedCommentCount',
        representImage: 'representImage',
        representImageWithoutType: 'representImageWithoutType',
        representImageType: 'representImageType',
        imageCount: 1,
        writeDateTimestamp: 1,
        aheadOfWriteDate: 'aheadOfWriteDate',
        saleStatus: 'saleStatus',
        noticeType: 'noticeType',
        menuId: 1,
        menuType: 'menuType',
        boardType: 'boardType',
        newArticle: true,
        openArticle: true,
        readCount: 1,
        upCount: 1,
        formattedReadCount: 'formattedReadCount',
        hasNewComment: true,
        lastCommentDateTimestamp: 1,
        refArticleId: 1,
        totalScore: 1,
        enableToReadWhenNotCafeMember: true,
      },
    ]),
    getMenus: jest.fn().mockResolvedValue([
      {
        menuId: 1,
        menuName: 'menuName',
      },
    ]),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BestwakkiService,
        {
          provide: getRepositoryToken(PopularArticle),
          useValue: {
            find: jest.fn(),
            save: jest.fn(),
            upsert: jest.fn(),
          },
        },
        {
          provide: NavercafeService,
          useValue: navercafeService,
        },
      ],
    }).compile();

    service = module.get<BestwakkiService>(BestwakkiService);
    popularArticleRepository = module.get<MockRepository<PopularArticle>>(
      getRepositoryToken(PopularArticle),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should call popularArticleRepository.find() with correct arguments', () => {
      service.findAll();
      expect(popularArticleRepository.find).toHaveBeenCalled();
    });
  });

  describe('find()', () => {
    it('should call popularArticleRepository.find() with correct arguments', () => {
      const searchArticleDto = {
        searchTarget: 'title',
        keyword: 'keyword',
        orderBy: 'time',
        perPage: 30,
        page: 1,
      };
      service.find(searchArticleDto as SearchArticleDto);
      expect(popularArticleRepository.find).toHaveBeenCalledWith({
        select: [
          'articleId',
          'publishedTimestamp',
          'subject',
          'readCount',
          'commentCount',
          'upCount',
          'menuId',
          'menuName',
          'nickname',
          'representImage',
        ],
        where: {
          subject: expect.any(Object),
        },
        order: {
          articleId: 'DESC',
        },
        skip: 0,
        take: 30,
      });
    });

    it('should call popularArticleRepository.find() with correct arguments when searchTarget is author', () => {
      const searchArticleDto = {
        searchTarget: 'author',
        keyword: 'keyword',
        orderBy: 'time',
        perPage: 30,
        page: 1,
      };
      service.find(searchArticleDto as SearchArticleDto);
      expect(popularArticleRepository.find).toHaveBeenCalledWith({
        select: [
          'articleId',
          'publishedTimestamp',
          'subject',
          'readCount',
          'commentCount',
          'upCount',
          'menuId',
          'menuName',
          'nickname',
          'representImage',
        ],
        where: {
          nickname: expect.any(Object),
        },
        order: {
          articleId: 'DESC',
        },
        skip: 0,
        take: 30,
      });
    });

    it('should call popularArticleRepository.find() with correct arguments when searchTarget is board', () => {
      const searchArticleDto = {
        searchTarget: 'board',
        keyword: 'keyword',
        orderBy: 'time',
        perPage: 30,
        page: 1,
      };
      service.find(searchArticleDto as SearchArticleDto);
      expect(popularArticleRepository.find).toHaveBeenCalledWith({
        select: [
          'articleId',
          'publishedTimestamp',
          'subject',
          'readCount',
          'commentCount',
          'upCount',
          'menuId',
          'menuName',
          'nickname',
          'representImage',
        ],
        where: {
          menuName: expect.any(Object),
        },
        order: {
          articleId: 'DESC',
        },
        skip: 0,
        take: 30,
      });
    });

    it('should call popularArticleRepository.find() with correct arguments when orderBy is time_oldest', () => {
      const searchArticleDto = {
        searchTarget: 'title',
        keyword: 'keyword',
        orderBy: 'time_oldest',
        perPage: 30,
        page: 1,
      };
      service.find(searchArticleDto as SearchArticleDto);
      expect(popularArticleRepository.find).toHaveBeenCalledWith({
        select: [
          'articleId',
          'publishedTimestamp',
          'subject',
          'readCount',
          'commentCount',
          'upCount',
          'menuId',
          'menuName',
          'nickname',
          'representImage',
        ],
        where: {
          subject: expect.any(Object),
        },
        order: {
          articleId: 'ASC',
        },
        skip: 0,
        take: 30,
      });
    });

    it('should call popularArticleRepository.find() with correct arguments when perPage is 10', () => {
      const searchArticleDto = {
        searchTarget: 'title',
        keyword: 'keyword',
        orderBy: 'time',
        perPage: 10,
        page: 1,
      };
      service.find(searchArticleDto as SearchArticleDto);
      expect(popularArticleRepository.find).toHaveBeenCalledWith({
        select: [
          'articleId',
          'publishedTimestamp',
          'subject',
          'readCount',
          'commentCount',
          'upCount',
          'menuId',
          'menuName',
          'nickname',
          'representImage',
        ],
        where: {
          subject: expect.any(Object),
        },
        order: {
          articleId: 'DESC',
        },
        skip: 0,
        take: 10,
      });
    });

    it('should call popularArticleRepository.find() with correct arguments when page is 2', () => {
      const searchArticleDto = {
        searchTarget: 'title',
        keyword: 'keyword',
        orderBy: 'time',
        perPage: 30,
        page: 2,
      };
      service.find(searchArticleDto as SearchArticleDto);
      expect(popularArticleRepository.find).toHaveBeenCalledWith({
        select: [
          'articleId',
          'publishedTimestamp',
          'subject',
          'readCount',
          'commentCount',
          'upCount',
          'menuId',
          'menuName',
          'nickname',
          'representImage',
        ],
        where: {
          subject: expect.any(Object),
        },
        order: {
          articleId: 'DESC',
        },
        skip: 30,
        take: 30,
      });
    });
  });

  describe('update()', () => {
    beforeAll(async () => {
      await service.update();
    });

    it('should call navercafeService.getPopularArticles()', () => {
      expect(navercafeService.getPopularArticles).toHaveBeenCalled();
    });
    it('should call navercafeService.getMenus()', () => {
      expect(navercafeService.getMenus).toHaveBeenCalled();
    });
    it('should call popularArticleRepository.upsert() with correct arguments', () => {
      expect(popularArticleRepository.upsert).toHaveBeenCalledWith(
        [
          new PopularArticle({
            articleId: 1,
            publishedTimestamp: new Date(1),
            lastCommentTimestamp: new Date(1),
            subject: 'subject',
            nickname: 'nickname',
            memberKey: 'memberKey',
            menuId: 1,
            menuName: 'menuName',
            readCount: 1,
            commentCount: 1,
            upCount: 1,
            representImage: 'representImage',
            representImageType: 'representImageType',
            imageCount: 1,
            totalScore: 1,
          }),
        ],
        ['articleId'],
      );
    });
  });
});
