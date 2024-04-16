import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { BestwakkiModule } from './bestwakki/bestwakki.module';
import { NavercafeModule } from './navercafe/navercafe.module';
import { MemberModule } from './member/member.module';
import { YoutubeModule } from './youtube/youtube.module';
import { AfreecaModule } from './afreeca/afreeca.module';
import databaseConfig from './config/database.config';
import youtubeConfig from './config/youtube.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, youtubeConfig],
      envFilePath:
        process.env.NODE_ENV === 'dev'
          ? '.env.development.local'
          : '.env.production.local',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    ScheduleModule.forRoot(),
    BestwakkiModule,
    NavercafeModule,
    MemberModule,
    YoutubeModule,
    AfreecaModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
