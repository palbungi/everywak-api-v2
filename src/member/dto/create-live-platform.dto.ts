import { IsEnum, IsString } from 'class-validator';
import { LivePlatformEnum } from 'src/constants/waktaverse';

export class CreateLivePlatformDto {
  @IsString()
  public readonly memberId: string;

  @IsEnum(LivePlatformEnum)
  public readonly type: string;

  @IsString()
  public readonly name: string;

  @IsString()
  public readonly channelId: string;
}
