import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AfreecaController } from './afreeca.controller';
import { AfreecaService } from './afreeca.service';

@Module({
  imports: [HttpModule],
  controllers: [AfreecaController],
  providers: [AfreecaService],
  exports: [AfreecaService],
})
export class AfreecaModule {}
