import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RequestDto } from 'src/fetch/dto/request.dto';
import { FetchService } from 'src/fetch/fetch.service';
import { SelectChannelDto } from './dto/select-channel.dto';
import { SelectPlaylistDto } from './dto/select-playlist.dto';
import { SelectVideoDto } from './dto/select-video.dto';
import {
  ChannelListResponse,
  PlaylistItemListResponse,
  VideoListResponse,
  YoutubePlaylistItem,
  YoutubeStream,
  YoutubeVideo,
} from './youtube.type';

@Injectable()
export class YoutubeService {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  @Inject(FetchService)
  private readonly fetchService: FetchService;

  private readonly logger = new Logger(YoutubeService.name);

  private readonly hostname = 'https://www.googleapis.com/youtube/v3';

  private readonly headers = {
    'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36`,
  };

  /**
   * @description ISO 8601에 따라 정의된 유튜브식 duration을 정수로 변환합니다.
   */
  convertYTDurationToInteger(duration: string): number {
    if ([null, undefined, 'P0D', 'P', ''].includes(duration)) {
      return 0;
    }
    const [orig, hour, min, sec] = duration.match(
      /^PT(?:(\d+\.*\d*)H)?(?:(\d+\.*\d*)M)?(?:(\d+\.*\d*)S)?$/,
    );

    let result = 0;
    if (!isNaN(parseFloat(hour))) {
      result += parseFloat(hour) * 3600;
    }
    if (!isNaN(parseFloat(min))) {
      result += parseFloat(min) * 60;
    }
    if (!isNaN(parseFloat(sec))) {
      result += parseFloat(sec);
    }
    return result;
  }

  async getChannels(selectChannelDto: SelectChannelDto) {
    this.logger.log(`채널 정보 요청: ${JSON.stringify(selectChannelDto)}`);
    const { channelId, part } = selectChannelDto;
    const pathname = `/channels`;
    const params = {
      part: part.join(','),
      id: channelId.join(','),
      key: this.configService.get('youtube.apiKey'),
    };
    return await this.fetchService.request<ChannelListResponse>(
      new RequestDto({
        hostname: this.hostname,
        pathname,
        params,
      }),
    );
  }

  async getPlaylistItems(selectPlaylistDto: SelectPlaylistDto) {
    this.logger.log(`재생목록 정보 요청: ${JSON.stringify(selectPlaylistDto)}`);
    const { playlistId, part, selectAll } = selectPlaylistDto;
    const pathname = `/playlistItems`;
    const params = {
      part: part.join(','),
      playlistId,
      key: this.configService.get('youtube.apiKey'),
      order: 'date',
      maxResults: '50',
    };
    if (!selectAll) {
      const response =
        await this.fetchService.request<PlaylistItemListResponse>(
          new RequestDto({
            hostname: this.hostname,
            pathname,
            params,
            headers: this.headers,
          }),
        );
      return response.items;
    } else {
      const result: YoutubePlaylistItem[] = [];
      let pageToken: string | undefined;
      do {
        const response =
          await this.fetchService.request<PlaylistItemListResponse>(
            new RequestDto({
              hostname: this.hostname,
              pathname,
              params: {
                ...params,
                pageToken: pageToken ?? '',
              },
              headers: this.headers,
            }),
          );
        if (response.items && response.items.length > 0) {
          result.push(...response.items);
        }
        pageToken = response.nextPageToken;
      } while (pageToken);
      return result;
    }
  }

  async getVideos(selectVideoDto: SelectVideoDto) {
    this.logger.log(`영상 정보 요청: ${JSON.stringify(selectVideoDto)}`);
    const { videoIds, part } = selectVideoDto;
    const pathname = `/videos`;

    const result: YoutubeVideo[] = [];

    while (videoIds.length > 0) {
      const partedIds = videoIds.splice(0, 50);
      const params = {
        part: part.join(','),
        id: partedIds.join(','),
        key: this.configService.get('youtube.apiKey'),
      };

      try {
        const response = await this.fetchService.request<VideoListResponse>(
          new RequestDto({
            hostname: this.hostname,
            pathname,
            params,
            headers: this.headers,
          }),
        );

        if (response.items && response.items.length > 0) {
          result.push(...response.items);
        }
      } catch (err) {
        this.logger.warn(
          `영상 정보 로드 중 에러: ${err?.message || err?.stringify?.() || err}`,
        );
      }
    }
    return result;
  }

  async getStream(channelId: string): Promise<YoutubeStream> {
    try {
      this.logger.log(`생방송 정보 요청: ${channelId}`);
      const hostname = 'https://www.youtube.com';
      const pathname = `/channel/${channelId}/live`;

      const response = await this.fetchService.request<string>(
        new RequestDto({
          hostname,
          pathname,
          headers: this.headers,
        }),
      );

      const videoId = response.match(
        /\<link rel\=\"canonical\" href\=\"https\:\/\/www\.youtube\.com\/watch\?v\=(?<videoId>.{11})\"/,
      )?.groups?.videoId;

      return {
        channelId,
        isLive: !!videoId,
        videoId: videoId ?? null,
      };
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException('Youtube error');
    }
  }
}
