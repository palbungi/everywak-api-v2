import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NavercafeModule } from 'src/navercafe/navercafe.module';
import { BestwakkiController } from './bestwakki.controller';
import { BestwakkiService } from './bestwakki.service';
import { PopularArticle } from './entities/popular-article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PopularArticle]), NavercafeModule],
  controllers: [BestwakkiController],
  providers: [BestwakkiService],
})
export class BestwakkiModule {}
