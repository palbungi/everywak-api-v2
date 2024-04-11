import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'src/typeorm.config';
import { BestwakkiService } from './bestwakki.service';

describe('BestwakkiService', () => {
  let service: BestwakkiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeORMConfig),
      ],
      providers: [BestwakkiService],
    }).compile();

    service = module.get<BestwakkiService>(BestwakkiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
