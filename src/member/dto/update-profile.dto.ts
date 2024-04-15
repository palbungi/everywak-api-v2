import { Optional } from '@nestjs/common';
import { IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  public readonly memberId: string;

  @Optional()
  @IsString()
  public readonly profileImage: string;

  @Optional()
  @IsString()
  public readonly offlineImage: string;
}
