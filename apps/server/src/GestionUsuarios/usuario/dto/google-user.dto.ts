// dto/login-google.dto.ts
import { IsEmail } from 'class-validator';

export class GoogleUserDto {
  @IsEmail()
  email: string;
  nombre: string;
  apellido:string;
  imagenperfil:string;
}
