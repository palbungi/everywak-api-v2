import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { BestwakkiModule } from './bestwakki/bestwakki.module';
import { NavercafeModule } from './navercafe/navercafe.module';
import { MemberModule } from './member/member.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.development.local' : '.env.production.local'
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    ScheduleModule.forRoot(),
    BestwakkiModule,
    NavercafeModule,
    MemberModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
