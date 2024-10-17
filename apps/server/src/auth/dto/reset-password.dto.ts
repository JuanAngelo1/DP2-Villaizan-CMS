import { IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  password: string;
  @IsString()
  jwtToken: string;
  @IsString()
  resetToken: string;
}
