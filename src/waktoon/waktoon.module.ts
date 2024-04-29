import { Module } from '@nestjs/common';
import { WaktoonService } from './waktoon.service';
import { WaktoonController } from './waktoon.controller';
import { NavercafeModule } from 'src/navercafe/navercafe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaktoonArticle } from './entities/waktoon-article.entity';
import { WaktoonAuthor } from './entities/waktoon-author.entity';
import { WaktoonSeries } from './entities/waktoon-series.entity';
import { WaktoonEpisode } from './entities/waktoon-episode.entity';
import { WaktoonEpisodePopularity } from './entities/waktoon-episode-popularity.entity';
import { WaktoonEpisodeChart } from './entities/waktoon-episode-chart.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WaktoonArticle,
      WaktoonAuthor,
      WaktoonSeries,
      WaktoonEpisode,
      WaktoonEpisodePopularity,
      WaktoonEpisodeChart,
    ]),
    NavercafeModule,
  ],
  providers: [WaktoonService],
  controllers: [WaktoonController],
})
export class WaktoonModule {}
