import { Controller, Get, Param } from '@nestjs/common';
import { AfreecaService } from './afreeca.service';

@Controller('afreeca')
export class AfreecaController {
  constructor(private readonly afreecaService: AfreecaService) {}

  @Get('/station/:channelId')
  getStation(@Param('channelId') channelId: string) {
    return this.afreecaService.getStation(channelId);
  }

  @Get('/stream/:channelId')
  getSteam(@Param('channelId') channelId: string) {
    return this.afreecaService.getStream({ channelId });
  }

  @Get('/emote/:channelId')
  getEmote(@Param('channelId') channelId: string) {
    return this.afreecaService.getSignatureEmotes(channelId);
  }
}
