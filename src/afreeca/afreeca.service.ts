import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { Station } from './afreeca.type';
import { RequestAfreecaDto } from './dto/request-afreeca.dto';

@Injectable()
export class AfreecaService {
  @Inject(HttpService)
  private readonly httpService: HttpService;

  private readonly hostname = 'http://bjapi.afreecatv.com';

  async request<T>(dto: RequestAfreecaDto): Promise<T> {
    const hostname = dto.hostname ?? this.hostname;
    return await lastValueFrom(
      this.httpService
        .get(hostname + dto.pathname, {
          params: dto.params,
          headers: { 'User-Agent': 'Mozilla/5.0' },
        })
        .pipe(map((response) => response.data)),
    );
  }

  async getStation(channelId: string) {
    const hostname = 'http://bjapi.afreecatv.com';
    const pathname = `/api/${channelId}/station`;
    return await this.request<Station>({ hostname, pathname });
  }
}
