import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { readFileSync } from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
  const ssl = process.env.SSL === 'true' ? true : false;
  let httpsOptions = null;
  if (ssl) {
    httpsOptions = {
      key: readFileSync(process.env.SSL_KEY_PATH),
      cert: readFileSync(process.env.SSL_CERT_PATH),
      ca: readFileSync(process.env.SSL_CA_PATH),
      minVersion: 'TLSv1.2',
    };
  }

  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
