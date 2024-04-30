import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import youtubeConfig from 'src/config/youtube.config';
import { FetchModule } from 'src/fetch/fetch.module';
import { YoutubeService } from './youtube.service';

describe('YoutubeService', () => {
  let service: YoutubeService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [youtubeConfig],
          envFilePath: '.env.test.local',
          isGlobal: true,
        }),
        FetchModule,
      ],
      providers: [YoutubeService],
    }).compile();

    service = module.get<YoutubeService>(YoutubeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('convertYTDurationToInteger', () => {
    it('should return 0 if duration is P0D', () => {
      expect(service.convertYTDurationToInteger('P0D')).toBe(0);
    });

    it('should return 3661 if duration is PT1H1M1S', () => {
      expect(service.convertYTDurationToInteger('PT1H1M1S')).toBe(3661);
    });

    it('should return 3660 if duration is PT1H1M', () => {
      expect(service.convertYTDurationToInteger('PT1H1M')).toBe(3660);
    });

    it('should return 3660 if duration is PT1H', () => {
      expect(service.convertYTDurationToInteger('PT1H')).toBe(3600);
    });

    it('should return 3600 if duration is PT60M', () => {
      expect(service.convertYTDurationToInteger('PT60M')).toBe(3600);
    });

    it('should return 3660 if duration is PT61M', () => {
      expect(service.convertYTDurationToInteger('PT61M')).toBe(3660);
    });

    it('should return 61 if duration is PT1M1S', () => {
      expect(service.convertYTDurationToInteger('PT1M1S')).toBe(61);
    });

    it('should return 60 if duration is PT1M', () => {
      expect(service.convertYTDurationToInteger('PT1M')).toBe(60);
    });

    it('should return 1 if duration is PT1S', () => {
      expect(service.convertYTDurationToInteger('PT1S')).toBe(1);
    });

    it('should return 0 if duration is PT0S', () => {
      expect(service.convertYTDurationToInteger('PT0S')).toBe(0);
    });

    it('should return 0 if duration is PT0M', () => {
      expect(service.convertYTDurationToInteger('PT0M')).toBe(0);
    });

    it('should return 0 if duration is PT0H', () => {
      expect(service.convertYTDurationToInteger('PT0H')).toBe(0);
    });

    it('should return 0 if duration is PT', () => {
      expect(service.convertYTDurationToInteger('PT')).toBe(0);
    });

    it('should return 0 if duration is P', () => {
      expect(service.convertYTDurationToInteger('P')).toBe(0);
    });

    it('should return 0 if duration is empty string', () => {
      expect(service.convertYTDurationToInteger('')).toBe(0);
    });

    it('should return 0 if duration is undefined', () => {
      expect(service.convertYTDurationToInteger(undefined)).toBe(0);
    });
  });
});
