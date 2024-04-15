import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { RequestYoutubeDto } from './dto/request-youtube.dto';
import { SelectChannelDto } from './dto/select-channel.dto';
import { SelectPlaylistDto } from './dto/select-playlist.dto';

@Injectable()
export class YoutubeService {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  @Inject(HttpService)
  private readonly httpService: HttpService;

  private readonly hostname = 'https://www.googleapis.com/youtube/v3';

  async request(dto: RequestYoutubeDto) {
    return await this.httpService.get(dto.url, { params: dto.params });
  }

  async getChannels(selectChannelDto: SelectChannelDto) {
    const { channelId, part } = selectChannelDto;
    const url = this.hostname + `/channels`;
    const params = {
      part: part.join(','),
      id: channelId.join(','),
      key: this.configService.get('youtube.apiKey'),
    };
    return await this.request({ url, params });
  }

  async getPlaylistItems(selectPlaylistDto: SelectPlaylistDto) {
    const { playlistId, part } = selectPlaylistDto;
    const url = this.hostname + `/playlistItems`;
    const params = {
      part: part.join(','),
      playlistId,
      key: this.configService.get('youtube.apiKey'),
    };
    return await this.request({ url, params });
  }
}
