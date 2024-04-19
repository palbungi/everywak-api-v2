import { Controller, Get, Query } from '@nestjs/common';
import { SearchVideoDto } from './dto/search-video.dto';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
  ) {}

  @Get('list')
  list(@Query() searchVideoDto: SearchVideoDto) {
    return this.videoService.findVideos(searchVideoDto);
  }

  @Get('update')
  update() {
    return this.videoService.updateVideos();
  }
}
