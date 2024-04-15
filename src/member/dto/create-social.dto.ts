import { IsEnum, IsString, Length } from 'class-validator';
import { SocialEnum } from 'src/constants/waktaverse';

export class CreateSocialDto {
  @IsString()
  public readonly memberId: string;

  @IsEnum(SocialEnum)
  public readonly type: string;

  @IsString()
  @Length(1, 50)
  public readonly name: string;

  @IsString()
  @Length(1, 50)
  public readonly userId: string;
}
