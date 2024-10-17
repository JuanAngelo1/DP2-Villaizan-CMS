import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthPayLoad } from './dto/auth.dto';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuarioRepository } from '../GestionUsuarios/usuario/usuario.repository';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private usuarioRepository: UsuarioRepository,
  ) {}

  async login({ email, password }: AuthPayLoad) {
    const user = await this.prisma.vi_usuario.findUnique({
      where: {
        correo: email,
      },
    });

    if (!user) {
      return {
        status: 'Error',
        message: 'Usuario no encontrado',
        result: [],
      };
    }

    const validatePassword = await bcrypt.compare(password, user.contrasena);

    if (!validatePassword) {
      return {
        status: 'Error',
        message: 'Contraseña incorrecta',
        result: [],
      };
    }

    const payload = { id: user.id, email: user.correo };
    const token = this.jwtService.sign(payload);

    return {
      status: 'Success',
      message: 'Usuario correctamente autenticado',
      token: token,
      user,
    };
  }

  private generateTenDigitToken(): string {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  }

  async requestResetPassword(requestResetPasswordDto: RequestResetPasswordDto) {
    const { email } = requestResetPasswordDto;
    const user = await this.usuarioRepository.findByEmail(email);

    const tenDigitToken = this.generateTenDigitToken();

    const payload = { userId: user.id, resetToken: tenDigitToken };
    const token = this.jwtService.sign(payload, { expiresIn: '2m' });

    return {
      status: 'Success',
      message: 'Token generado exitosamente',
      token: token,
      resetToken: tenDigitToken,
    };
  }

  async resetPasswordToken(resetPasswordDto: ResetPasswordDto) {
    const { jwtToken, password } = resetPasswordDto;
    try {
      const decoded = this.jwtService.verify(jwtToken);
      // Busca al usuario por el ID obtenido del token
      const user = await this.usuarioRepository.findById(decoded.userId);

      if (
        !decoded.resetToken ||
        decoded.resetToken !== resetPasswordDto.resetToken
      ) {
        throw new UnauthorizedException('Token personalizado inválido');
      }

      // Hashear la nueva contraseña igual que en el registro(bcrypt con 10)
      const hashedPassword = await bcrypt.hash(password, 10);

      await this.usuarioRepository.updatePassword(user.id, hashedPassword);

      return {
        status: 'Success',
        message: 'Contraseña actualizada exitosamente',
      };
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
