import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsString, ValidateNested } from 'class-validator';
import { RoleEnum } from 'src/constants/waktaverse';

export class CreateMemberDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateMemberModel)
  public readonly members: CreateMemberModel[];
}

export class CreateMemberModel {
  @IsString()
  public readonly name: string;

  @IsEnum(RoleEnum)
  public readonly role: string;
}
