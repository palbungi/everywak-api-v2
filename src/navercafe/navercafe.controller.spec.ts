import { Test, TestingModule } from '@nestjs/testing';
import { NavercafeController } from './navercafe.controller';

describe('NavercafeController', () => {
  let controller: NavercafeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NavercafeController],
    }).compile();

    controller = module.get<NavercafeController>(NavercafeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
