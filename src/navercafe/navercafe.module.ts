import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { NavercafeController } from './navercafe.controller';
import { NavercafeService } from './navercafe.service';

@Module({
  imports: [HttpModule],
  controllers: [NavercafeController],
  providers: [NavercafeService],
  exports: [NavercafeService],
})
export class NavercafeModule {}
