import { IsString, Length } from 'class-validator';

export class UpdateProfileImageDto {
  @IsString()
  public readonly memberId: string;

  @IsString()
  @Length(1, 200)
  public readonly profileImage: string;
}
