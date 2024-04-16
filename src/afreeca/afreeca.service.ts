import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { RequestAfreecaDto } from './dto/request-afreeca.dto';

@Injectable()
export class AfreecaService {
  @Inject(HttpService)
  private readonly httpService: HttpService;

  private readonly hostname = 'http://bjapi.afreecatv.com';

  async request<T>(dto: RequestAfreecaDto): Promise<T> {
    const hostname = dto.hostname ?? this.hostname;
    const requestParams = [
      hostname + dto.pathname,
      {
        params: dto.params,
        headers: { 'User-Agent': 'Mozilla/5.0' },
      },
    ];
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
    return await this.request<Station>({ hostname, pathname });
  }
}
