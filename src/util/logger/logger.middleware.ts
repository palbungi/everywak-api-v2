import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { winstonLogger } from './logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent');
    const ipAddr = (req.headers['x-forwarded-for'] as string)?.split(',')[0];
    let startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const elapsedTime = Date.now() - startTime;
      if (statusCode >= 400 && statusCode < 500)
        winstonLogger.warn(
          `[${method}]${originalUrl}(${statusCode}) ${elapsedTime}ms ${ipAddr || ip} ${userAgent}`,
          'http',
        );
      else if (statusCode >= 500)
        winstonLogger.error(
          `[${method}]${originalUrl}(${statusCode}) ${elapsedTime}ms ${ipAddr || ip} ${userAgent}`,
          'http',
        );
      else
        winstonLogger.log(
          `[${method}]${originalUrl}(${statusCode}) ${elapsedTime}ms ${ipAddr || ip} ${userAgent}`,
          'http',
        );
    });

    next();
  }
}
