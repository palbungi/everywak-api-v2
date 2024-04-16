import { Test, TestingModule } from '@nestjs/testing';
import { AfreecaController } from './afreeca.controller';

describe('AfreecaController', () => {
  let controller: AfreecaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AfreecaController],
    }).compile();

    controller = module.get<AfreecaController>(AfreecaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
