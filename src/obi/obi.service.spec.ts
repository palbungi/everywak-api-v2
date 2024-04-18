import { Test, TestingModule } from '@nestjs/testing';
import { ObiService } from './obi.service';

describe('ObiService', () => {
  let service: ObiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ObiService],
    }).compile();

    service = module.get<ObiService>(ObiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
