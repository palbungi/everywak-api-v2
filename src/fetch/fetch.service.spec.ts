import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { FetchService } from './fetch.service';

describe('FetchService', () => {
  let service: FetchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [FetchService],
    }).compile();

    service = module.get<FetchService>(FetchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
