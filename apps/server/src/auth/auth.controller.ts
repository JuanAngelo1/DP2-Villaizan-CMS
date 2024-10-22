import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPayLoad } from './dto/auth.dto';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login(@Body() payload: AuthPayLoad) {
    return this.authService.login(payload);
  }

  //Tomar como referencia el siguiente código
  @Post('solicitarCambiarContrasena')
  requestResetPassword(
    @Body() requestResetPasswordDto: RequestResetPasswordDto,
  ) {
    return this.authService.requestResetPassword(requestResetPasswordDto);
  }

  @Post('cambiarContrasena')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPasswordToken(resetPasswordDto);
  }
}
