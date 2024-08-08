import { HttpService } from '@nestjs/axios';
import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map, Observable } from 'rxjs';
import { RequestDto } from './dto/request.dto';
require('dnscache')({ enable: true })

@Injectable()
export class FetchService {
  @Inject(HttpService)
  private readonly httpService: HttpService;

  async request<T>(dto: RequestDto): Promise<T> {
    const url = dto.hostname + dto.pathname;
    const body = dto.body ?? {};
    const config = {
      params: dto.params,
      headers: dto.headers ?? {
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
}
