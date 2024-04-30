import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { FetchController } from './fetch.controller';
import { FetchService } from './fetch.service';

describe('FetchController', () => {
  let controller: FetchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [FetchController],
      providers: [FetchService],
    }).compile();

    controller = module.get<FetchController>(FetchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
