import { IsString, Length } from 'class-validator';

export class UpdateOfflineImageDto {
  @IsString()
  public readonly memberId: string;

  @IsString()
  @Length(1, 200)
  public readonly offlineImage: string;
}
