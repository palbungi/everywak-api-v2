import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Member } from 'src/member/entities/member.entity';
import { MemberService } from 'src/member/member.service';
import { Video } from 'src/video/entities/video.entity';
import { VideoService } from 'src/video/video.service';
import { SelectPlaylistDto } from 'src/youtube/dto/select-playlist.dto';
import { YoutubeService } from 'src/youtube/youtube.service';
import { Repository } from 'typeorm';
import { CreateMusicDto } from './dto/create-music.dto';
import { MusicChart } from './entities/music-chart.entity';
import { Music } from './entities/music.entity';
import { MusicService } from './music.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('MusicService', () => {
  let service: MusicService;
  let musicRepository: MockRepository<Music>;
  let musicChartRepository: MockRepository<MusicChart>;
  let memberService = {
    findAll: jest
      .fn()
      .mockResolvedValue(
        new Promise((r) =>
          r([new Member({ id: 'member1' }), new Member({ id: 'member2' })]),
        ),
      ),
  };
  let videoService = {
    findAll: jest.fn(),
    findViewCount: jest.fn(),
    getVideo: jest.fn(),
  };
  let youtubeService = {
    getPlaylistItems: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MusicService,
        {
          provide: getRepositoryToken(Music),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(MusicChart),
          useValue: {
            find: jest.fn(),
            manager: {
              transaction: jest.fn(),
            },
          },
        },
        { provide: MemberService, useValue: memberService },
        { provide: VideoService, useValue: videoService },
        { provide: YoutubeService, useValue: youtubeService },
      ],
    }).compile();

    service = module.get<MusicService>(MusicService);
    musicRepository = module.get<MockRepository<Music>>(
      getRepositoryToken(Music),
    );
    musicChartRepository = module.get<MockRepository<MusicChart>>(
      getRepositoryToken(MusicChart),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    let dto: CreateMusicDto;
    let video: Video;
    let music: Music;
    beforeAll(async () => {
      dto = new CreateMusicDto({
        videoId: 'a',
        title: 'title',
        singerName: 'singer',
        singers: ['member1', 'member2'],
      });
      video = new Video({
        videoId: 'a',
      });
      music = new Music({
        video: video,
        title: 'title',
        singerName: 'singer',
        singers: [new Member({ id: 'member1' }), new Member({ id: 'member2' })],
      });
      jest
        .spyOn(musicRepository, 'save')
        .mockResolvedValue(new Promise((r) => r(music)));
    });

    it('should return music', async () => {
      jest
        .spyOn(videoService, 'getVideo')
        .mockImplementation(() => new Promise((r) => r(video)));
      const result = await service.create(dto);
      expect(result).toBeInstanceOf(Music);
    });

    it('should call musicRepository.save', async () => {
      await service.create(dto);
      expect(musicRepository.save).toHaveBeenCalled();
    });

    it('should return music with video', async () => {
      const result = await service.create(dto);
      console.log(result);
      expect(result.video).toEqual(video);
    });
  });

  describe('getVideosCreateNeeded()', () => {
    let response: Video[];
    const video = new Video({
      videoId: 'a',
    });
    beforeAll(async () => {
      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => new Promise((resolve) => resolve([])));

      videoService.findAll.mockResolvedValue([video]);
      musicRepository.find.mockResolvedValue([]);
      youtubeService.getPlaylistItems.mockResolvedValue([
        {
          snippet: {
            resourceId: { videoId: 'a' },
          },
        },
      ]);

      response = await service.getVideosCreateNeeded();
    });

    it('should return array', async () => {
      expect(response).toBeInstanceOf(Array);
    });

    it('should call video.findall', async () => {
      expect(videoService.findAll).toHaveBeenCalled();
    });

    it('should call music.findall', async () => {
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should call 왁타버스 올 뮤직 playlist items', async () => {
      await service.getVideosCreateNeeded();
      expect(youtubeService.getPlaylistItems).toHaveBeenCalledWith(
        new SelectPlaylistDto({
          playlistId: 'PLWTycz4el4t7ZCxkGYyekoP1iBxmOM4zZ',
        }),
      );
    });

    it('should return array of videos not in music', async () => {
      const result = await service.getVideosCreateNeeded();
      expect(result).toEqual([video]);
    });
  });

  describe('createMusicFromWakAllMusic()', () => {
    const video = new Video({
      videoId: 'a',
      title: 'title',
      member: new Member({ name: 'name' }),
    });
    it('should call getVideosCreateNeeded', async () => {
      jest.spyOn(service, 'getVideosCreateNeeded').mockResolvedValue([]);
      await service.createMusicFromWakAllMusic();
      expect(service.getVideosCreateNeeded).toHaveBeenCalled();
    });

    it('should not call create if getVideosCreateNeeded returns empty array', async () => {
      jest.spyOn(service, 'getVideosCreateNeeded').mockResolvedValue([]);
      jest
        .spyOn(service, 'create')
        .mockResolvedValue(new Promise((r) => r(new Music({}))));
      await service.createMusicFromWakAllMusic();
      expect(service.create).not.toHaveBeenCalled();
    });

    it('should call create if getVideosCreateNeeded returns some videos', async () => {
      jest.spyOn(service, 'getVideosCreateNeeded').mockResolvedValue([video]);
      jest
        .spyOn(service, 'create')
        .mockResolvedValue(new Promise((r) => r(new Music({}))));
      await service.createMusicFromWakAllMusic();
      expect(service.create).toHaveBeenCalled();
    });

    it('should return music array', async () => {
      jest.spyOn(service, 'getVideosCreateNeeded').mockResolvedValue([video]);
      jest
        .spyOn(service, 'create')
        .mockResolvedValue(new Promise((r) => r(new Music({}))));
      const result = await service.createMusicFromWakAllMusic();
      expect(result).toBeInstanceOf(Array);
      expect(result[0]).toBeInstanceOf(Music);
    });
  });
});
