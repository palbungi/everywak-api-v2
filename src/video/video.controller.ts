import { Controller, Get, Logger, Query } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SearchVideoDto } from './dto/search-video.dto';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
  ) {}
  private readonly logger = new Logger(VideoController.name);

  @Get('list')
  list(@Query() searchVideoDto: SearchVideoDto) {
    return this.videoService.find(searchVideoDto);
  }

  @Get('update')
  update() {
    try {
      return this.videoService.updateVideos();
    } catch (e) {
      this.logger.error(e);
      console.error(e);
    }
  }

  // 하루에 네 번 갱신
  // @Cron('0 0,6,12,18 * * *')
  updateVideosCron() {
    try {
      return this.videoService.updateVideos();
    } catch (e) {
      this.logger.error(e);
      console.error(e);
    }
  }
}
