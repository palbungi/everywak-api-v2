import { Optional } from "@nestjs/common";
import { IsString } from "class-validator";

export class SelectStreamDto {
  @IsString()
  readonly channelId: string;

  @Optional()
  @IsString()
  readonly password?: string;
}
