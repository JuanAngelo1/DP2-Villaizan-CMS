import { IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  id: string;
  @IsString()
  password: string;
  @IsString()
  token: string;
}
