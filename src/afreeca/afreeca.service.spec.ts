import { Test, TestingModule } from '@nestjs/testing';
import { FetchModule } from 'src/fetch/fetch.module';
import { AfreecaService } from './afreeca.service';

describe('AfreecaService', () => {
  let service: AfreecaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FetchModule],
      providers: [AfreecaService],
    }).compile();

    service = module.get<AfreecaService>(AfreecaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('방송국 정보', async () => {
    const station = await service.getStation('ecvhao');
    expect(station?.station).toBeDefined();
  });

  it('생방송 정보', async () => {
    const station = await service.getStream({ channelId: 'ecvhao' });
    expect(typeof station?.CHANNEL.RESULT).toBe('number');
  });

  it('이모트 목록', async () => {
    const emoteRes = await service.getSignatureEmotes('ecvhao');
    expect(emoteRes?.result).toBe(1);
    expect(emoteRes?.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: expect.any(String),
          pc_img: expect.any(String),
          mobile_img: expect.any(String),
          pc_alternate_img: expect.any(String),
          mob_alternate_img: expect.any(String),
          move_img: expect.any(String),
          order_no: expect.any(String),
          black_keyword: expect.any(String),
        }),
      ]),
    );
  });
});
