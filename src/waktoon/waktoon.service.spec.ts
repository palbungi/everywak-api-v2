import { Test, TestingModule } from '@nestjs/testing';
import { WaktoonService } from './waktoon.service';

describe('WaktoonService', () => {
  let service: WaktoonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaktoonService],
    }).compile();

    service = module.get<WaktoonService>(WaktoonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
