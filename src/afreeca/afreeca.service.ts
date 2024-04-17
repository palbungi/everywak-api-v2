import { Inject, Injectable } from '@nestjs/common';
import { RequestDto } from 'src/fetch/dto/request.dto';
import { FetchService } from 'src/fetch/fetch.service';
import { Station, StreamInfo } from './afreeca.type';
import { SelectStreamDto } from './dto/select-stream.dto';

@Injectable()
export class AfreecaService {
  @Inject(FetchService)
  private readonly fetchService: FetchService;

  private readonly hostname = 'http://bjapi.afreecatv.com';

  private readonly headers = {
    'User-Agent': 'Mozilla/5.0',
    'content-type': 'application/x-www-form-urlencoded',
  };

  async getStation(channelId: string) {
    const hostname = 'http://bjapi.afreecatv.com';
    const pathname = `/api/${channelId}/station`;
    return await this.fetchService.request<Station>(
      new RequestDto({ hostname, pathname, headers: this.headers }),
    );
  }

  async getStream(selectStreamDto: SelectStreamDto) {
    const method = 'POST';
    const hostname = 'https://live.afreecatv.com';
    const pathname = `/afreeca/player_live_api.php`;
    const params = { bjid: selectStreamDto.channelId };
    const body = {
      bid: selectStreamDto.channelId,
      type: 'live',
      pwd: '',
      player_type: 'html5',
      stream_type: 'common',
      mode: 'landing',
      from_api: 0,
    };
    return await this.fetchService.request<StreamInfo>(
      new RequestDto({
        method,
        hostname,
        pathname,
        params,
        body,
        headers: this.headers,
      }),
    );
  }
}
