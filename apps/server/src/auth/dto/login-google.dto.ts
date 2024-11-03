// dto/login-google.dto.ts
import { IsEmail } from 'class-validator';

export class LoginGoogleDto {
  @IsEmail()
  email: string;
}
