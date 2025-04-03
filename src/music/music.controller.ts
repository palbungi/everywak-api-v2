import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CreateMusicDto } from './dto/create-music.dto';
import { DeleteMusicDto } from './dto/delete-music.dto';
import { SearchMusicDto } from './dto/search-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}
  private readonly logger = new Logger(MusicController.name);

  @Get('list')
  find(@Query() dto: SearchMusicDto) {
    return this.musicService.find(dto);
  }

  @Post('create')
  create(@Body() dto: CreateMusicDto) {
    return this.musicService.create(dto);
  }

  @Post('edit')
  edit(@Body() dto: UpdateMusicDto) {
    return this.musicService.edit(dto);
  }

  @Post('delete')
  delete(@Body() dto: DeleteMusicDto) {
    return this.musicService.delete(dto);
  }

  // 한 시간에 한 번 차트 갱신
  @Cron('2 * * * *')
  updateMusicChartCron() {
    try {
      return this.musicService.updateMusicChart();
    } catch (e) {
      this.logger.error(e);
    }
  }

  // 한 시간에 한 번 왁타버스 올 뮤직 재생목록에서 뮤직 자동 추가
  @Cron('1 * * * *')
  updateAllMusicCron() {
    try {
      return this.musicService.createMusicFromWakAllMusic();
    } catch (e) {
      this.logger.error(e);
    }
  }
}
