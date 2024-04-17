import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { Station, StreamInfo } from './afreeca.type';
import { RequestAfreecaDto } from './dto/request-afreeca.dto';
import { SelectStreamDto } from './dto/select-stream.dto';

@Injectable()
export class AfreecaService {
  @Inject(HttpService)
  private readonly httpService: HttpService;

  private readonly hostname = 'http://bjapi.afreecatv.com';

  async request<T>(dto: RequestAfreecaDto): Promise<T> {
    const url = (dto.hostname ?? this.hostname) + dto.pathname;
    const body = dto.body ?? {};
    const config = {
      params: dto.params,
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'content-type': 'application/x-www-form-urlencoded',
      },
    };
    const requestParams = [url, config];

    if (dto.method === 'GET') {
      return await lastValueFrom(
        this.httpService
          .get(url, config)
          .pipe(map((response) => response.data)),
      );
    } else if (dto.method === 'POST') {
      return await lastValueFrom(
        this.httpService
          .post(url, body, config)
          .pipe(map((response) => response.data)),
      );
    }

    // other methods
    const requestFunction =
      this.httpService[dto.method?.toLowerCase() ?? 'get'];
    return await lastValueFrom(
      (
        requestFunction(...requestParams) as Observable<AxiosResponse<T, any>>
      ).pipe(map((response) => response.data)),
    );
  }

  async getStation(channelId: string) {
    const hostname = 'http://bjapi.afreecatv.com';
    const pathname = `/api/${channelId}/station`;
    return await this.request<Station>(
      new RequestAfreecaDto({ hostname, pathname }),
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
    return await this.request<StreamInfo>(
      new RequestAfreecaDto({
        method,
        hostname,
        pathname,
        params,
        body,
      }),
    );
  }
}
