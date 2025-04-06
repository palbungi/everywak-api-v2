import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InsertSeriesDto } from './dto/insert-series.dto';
import { SearchAuthorDto } from './dto/search-author.dto';
import { SearchEpisodeChartDto } from './dto/search-episode-chart.dto';
import { SearchEpisodeDto } from './dto/search-episode.dto';
import { SearchSeriesDto } from './dto/search-series.dto';
import { WaktoonService } from './waktoon.service';

@Controller('waktoon')
export class WaktoonController {
  constructor(private readonly waktoonService: WaktoonService) {}
  private readonly logger = new Logger(WaktoonController.name);

  @Get('articles')
  findAll() {
    return this.waktoonService.findAllArticles();
  }

  @Get('authors')
  findAuthors(@Query() dto: SearchAuthorDto) {
    return this.waktoonService.findAuthors(dto);
  }

  @Get('episodes')
  findAllEpisodes(@Query() dto: SearchEpisodeDto) {
    return this.waktoonService.findEpisodes(dto);
  }

  @Get('series')
  findAllSeries(@Query() dto: SearchSeriesDto) {
    return this.waktoonService.findSeries(dto);
  }

  @Get('articles/update')
  update() {
    return this.waktoonService.updateArticles();
  }

  @Get('authors/update')
  updateAuthors() {
    return this.waktoonService.updateAuthors();
  }

  @Get('series/update')
  async updateSeries() {
    const episodes = await this.waktoonService.findAllEpisodes();
    return this.waktoonService.updateSeries(episodes);
  }

  @Post('series')
  insertSeries(@Body() dto: InsertSeriesDto) {
    return this.waktoonService.insertSeries(dto);
  }

  @Post('update')
  updateAll() {
    return this.waktoonService.updateWaktoon();
  }

  @Get('chart')
  getEpisodeChart(@Query() dto: SearchEpisodeChartDto) {
    return this.waktoonService.getEpisodeChart(dto);
  }

  // 하루에 한 번 작가 갱신
  @Cron('0 0 * * *')
  updateAuthorsCron() {
    //return this.waktoonService.updateAuthors();
  }

  // 한 시간에 한 번 게시글/에피소드/시리즈/차트 갱신
  @Cron('10 * * * *')
  updateWaktoonCron() {
    try {
      return this.waktoonService.updateWaktoon();
    } catch (e) {
      this.logger.error(e);
      console.error(e);
    }
  }
}
