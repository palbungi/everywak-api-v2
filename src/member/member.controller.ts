import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { SelectMemberDto } from './dto/select-member.dto';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // @Get('/setup')
  // setupMember() {
  //   return this.memberService.insertWaktaverseMembers();
  // }

  @Get('/list')
  listMember() {
    return this.memberService.findAll();
  }

  @Get('/:memberId')
  getMember(@Param() selectMemberDto: SelectMemberDto) {
    return this.memberService.findMemberById(selectMemberDto.memberId);
  }
}
