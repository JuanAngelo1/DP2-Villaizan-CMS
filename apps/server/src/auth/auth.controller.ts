import {
  Controller,
  Post,
  Body,
  NotFoundException,
  HttpException,
  HttpStatus,
  Res,
  Param
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayLoad } from './dto/auth.dto';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Request, Response } from 'express';
import { LoginGoogleDto } from './dto/login-google.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(@Body() payload: AuthPayLoad) {
    return this.authService.login(payload);
  }

  @Post('infoUsuario')
  async loginGoogle(@Body() loginGoogleDto: LoginGoogleDto) {
    return this.authService.loginGoogle(loginGoogleDto);
  }

  //Tomar como referencia el siguiente código
  @Post('solicitarCambiarContrasena')
  requestResetPassword(
    @Body() requestResetPasswordDto: RequestResetPasswordDto,
  ) {
    try {
      return this.authService.requestResetPassword(requestResetPasswordDto);
    } catch (e) {
      if (e instanceof NotFoundException) {
        return {
          status: 'Success',
          message: 'Usuario no encontrado',
        };
      }
      throw new HttpException(
        {
          status: 'Error',
          message: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('cambiarContrasena')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPasswordToken(resetPasswordDto);
  }
}
