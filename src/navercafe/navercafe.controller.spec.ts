import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { NavercafeController } from './navercafe.controller';
import { NavercafeService } from './navercafe.service';

describe('NavercafeController', () => {
  let controller: NavercafeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [NavercafeController],
      providers: [NavercafeService],
    }).compile();

    controller = module.get<NavercafeController>(NavercafeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
