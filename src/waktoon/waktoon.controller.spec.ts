import { Test, TestingModule } from '@nestjs/testing';
import { WaktoonController } from './waktoon.controller';

describe('WaktoonController', () => {
  let controller: WaktoonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaktoonController],
    }).compile();

    controller = module.get<WaktoonController>(WaktoonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
