import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RequestDto } from 'src/fetch/dto/request.dto';
import { FetchService } from 'src/fetch/fetch.service';
import { SelectChannelDto } from './dto/select-channel.dto';
import { SelectPlaylistDto } from './dto/select-playlist.dto';
import {
  ChannelListResponse,
  PlaylistItemListResponse,
  YoutubeStream,
} from './youtube.type';

@Injectable()
export class YoutubeService {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  @Inject(FetchService)
  private readonly fetchService: FetchService;

  private readonly hostname = 'https://www.googleapis.com/youtube/v3';

  private readonly headers = {
    'User-Agent': `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36`,
  };

  async getChannels(selectChannelDto: SelectChannelDto) {
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
    const { playlistId, part } = selectPlaylistDto;
    const pathname = `/playlistItems`;
    const params = {
      part: part.join(','),
      playlistId,
      key: this.configService.get('youtube.apiKey'),
    };
    return await this.fetchService.request<PlaylistItemListResponse>(
      new RequestDto({
        hostname: this.hostname,
        pathname,
        params,
        headers: this.headers,
      }),
    );
  }

  async getStream(channelId: string): Promise<YoutubeStream> {
    try {
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
