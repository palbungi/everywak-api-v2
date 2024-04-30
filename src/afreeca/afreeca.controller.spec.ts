import { Test, TestingModule } from '@nestjs/testing';
import { FetchModule } from 'src/fetch/fetch.module';
import { AfreecaController } from './afreeca.controller';
import { AfreecaService } from './afreeca.service';

describe('AfreecaController', () => {
  let controller: AfreecaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FetchModule],
      controllers: [AfreecaController],
      providers: [AfreecaService],
    }).compile();

    controller = module.get<AfreecaController>(AfreecaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
