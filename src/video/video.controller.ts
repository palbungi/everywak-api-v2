import { Controller, Get, Query } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SearchVideoDto } from './dto/search-video.dto';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
  ) {}

  @Get('list')
  list(@Query() searchVideoDto: SearchVideoDto) {
    return this.videoService.find(searchVideoDto);
  }

  @Get('update')
  update() {
    return this.videoService.updateVideos();
  }

  // 하루에 네 번 갱신
  @Cron('0 0,6,12,18 * * *')
  updateVideosCron() {
    return this.videoService.updateVideos();
  }
}
