import { Module } from '@nestjs/common';
import { FetchModule } from 'src/fetch/fetch.module';
import { AfreecaController } from './afreeca.controller';
import { AfreecaService } from './afreeca.service';

@Module({
  imports: [FetchModule],
  controllers: [AfreecaController],
  providers: [AfreecaService],
  exports: [AfreecaService],
})
export class AfreecaModule {}
