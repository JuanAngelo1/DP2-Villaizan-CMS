import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthPayLoad } from './dto/auth.dto';
import { RequestResetPasswordDto } from './dto/request-reset-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as dayjs from 'dayjs'; // Para manejar fechas de expiración
import { UsuarioRepository } from '../GestionUsuarios/usuario/usuario.repository';
import { from } from 'rxjs';
import * as nodemailer from 'nodemailer';

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

  async sendResetPasswordEmail(
    email: string,
    nombre: string,
    resetToken: string,
  ) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Restablecimiento de contraseña',
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: black;">Hola, ${nombre}!</h2>
        <p>Recibimos una solicitud para restablecer tu contraseña. Haz clic en el botón de abajo para cambiarla:</p>
        <a href="http://localhost:3000/recuperar-contrasena?token=${resetToken}" style="display: inline-block; padding: 10px 20px; background-color: rgb(153, 27, 27); color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">Cambiar Contraseña</a>
        <p style="margin-top: 20px;">Si no solicitaste este cambio, puedes ignorar este correo.</p>
        <p>Este enlace es válido por 2 minutos.</p>
        <p style="margin-top: 30px;">Saludos,<br>El equipo de soporte</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
  }

  async requestResetPassword(requestResetPasswordDto: RequestResetPasswordDto) {
    const { email } = requestResetPasswordDto;
    const user = await this.usuarioRepository.findByEmail(email);

    const tenDigitToken = this.generateTenDigitToken();

    const expirationDate = dayjs().add(2, 'minute').toDate();

    await this.usuarioRepository.saveResetToken(
      user.id,
      tenDigitToken,
      expirationDate,
    );

    // Envía el token de restablecimiento por correo
    await this.sendResetPasswordEmail(email, user.nombre, tenDigitToken);

    return {
      status: 'Success',
      message: 'Token generado exitosamente',
    };
  }

  async resetPasswordToken(resetPasswordDto: ResetPasswordDto) {
    const { id, token, password } = resetPasswordDto;
    try {
      const user = await this.usuarioRepository.findById(id);

      if (token !== user.resettoken) {
        throw new UnauthorizedException('Token inválido');
      }

      const now = new Date();
      //console.log(now);
      if (user.resettokenexpiracion < now) {
        throw new UnauthorizedException('Token expirado');
      }

      // Hashear la nueva contraseña igual que en el registro(bcrypt con 10)
      const hashedPassword = await bcrypt.hash(password, 10);

      await this.usuarioRepository.updatePassword(user.id, hashedPassword);

      await this.usuarioRepository.clearResetToken(id);

      return {
        status: 'Success',
        message: 'Contraseña actualizada exitosamente',
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      console.error(error);

      throw new HttpException(
        {
          status: 'Error',
          message: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
