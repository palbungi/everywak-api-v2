import { Test, TestingModule } from '@nestjs/testing';
import { AfreecaService } from './afreeca.service';

describe('AfreecaService', () => {
  let service: AfreecaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AfreecaService],
    }).compile();

    service = module.get<AfreecaService>(AfreecaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
