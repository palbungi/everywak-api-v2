import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from 'src/member/entities/member.entity';
import { MemberModule } from 'src/member/member.module';
import { NavercafeModule } from 'src/navercafe/navercafe.module';
import { OBI } from './entities/obi.entity';
import { ObiController } from './obi.controller';
import { ObiService } from './obi.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member, OBI]),
    NavercafeModule,
    MemberModule,
  ],
  controllers: [ObiController],
  providers: [ObiService],
})
export class ObiModule {}
