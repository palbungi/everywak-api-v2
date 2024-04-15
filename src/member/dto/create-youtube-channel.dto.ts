import { IsEnum, IsString, Length } from "class-validator";
import { YoutubeChannelEnum } from "src/constants/waktaverse";

export class CreateYoutubeChannelDto {
  @IsString()
  public readonly memberId: string;

  @IsEnum(YoutubeChannelEnum)
  public readonly type: string;

  @IsString()
  public readonly name: string;

  @IsString()
  @Length(24, 24)
  public readonly channelId: string;

  @IsString()
  @Length(24, 34)
  public readonly uploads: string;
}