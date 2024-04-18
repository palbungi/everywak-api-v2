import { Test, TestingModule } from '@nestjs/testing';
import { ObiController } from './obi.controller';

describe('ObiController', () => {
  let controller: ObiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ObiController],
    }).compile();

    controller = module.get<ObiController>(ObiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
