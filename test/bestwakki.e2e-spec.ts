import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('BestwakkiController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        disableErrorMessages: true,
      }),
    );
    await app.init();
    await request(app.getHttpServer()).get('/bestwakki/update');
  });

  it('/bestwakki/list (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/bestwakki/list');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('/bestwakki/list?perPage=10 (GET)', async () => {
    const response = await request(app.getHttpServer()).get(
      '/bestwakki/list?perPage=10',
    );
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(10);
  });

  it('/bestwakki/list?keyword=왁굳 (GET)', async () => {
    const response = await request(app.getHttpServer()).get(
      encodeURI('/bestwakki/list?keyword=왁굳'),
    );
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(
      response.body.filter((article) => article.subject.includes('왁굳'))
        .length,
    ).toBe(response.body.length);
  });

  it('/bestwakki/list?keyword=우왁굳&searchTarget=author (GET)', async () => {
    const response = await request(app.getHttpServer()).get(
      encodeURI('/bestwakki/list?keyword=우왁굳&searchTarget=author'),
    );
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(
      response.body.filter((article) => article.nickname === '우왁굳').length,
    ).toBe(response.body.length);
  });

  afterEach(async () => {
    await app.close();
  });
});
