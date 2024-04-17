import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FetchController } from './fetch.controller';
import { FetchService } from './fetch.service';

@Module({
  imports: [HttpModule],
  controllers: [FetchController],
  providers: [FetchService],
  exports: [FetchService],
})
export class FetchModule {}
