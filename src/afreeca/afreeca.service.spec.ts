import { Test, TestingModule } from '@nestjs/testing';
import { FetchModule } from 'src/fetch/fetch.module';
import { AfreecaService } from './afreeca.service';

describe('AfreecaService', () => {
  let service: AfreecaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FetchModule],
      providers: [AfreecaService],
    }).compile();

    service = module.get<AfreecaService>(AfreecaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
