import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { NavercafeService } from './navercafe.service';

describe('NavercafeService', () => {
  let service: NavercafeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [NavercafeService],
    }).compile();

    service = module.get<NavercafeService>(NavercafeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  it('get popular articles from navercafe', async () => {
    expect(await service.getPopularArticles()).toBeInstanceOf(Array);
  });

  it('get menus from navercafe', async () => {
    expect(await service.getMenus()).toBeInstanceOf(Array);
  });
});
