import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthPayLoad } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor (private prisma: PrismaService,
        private jwtService: JwtService
    ) {}

    async login({email, password}: AuthPayLoad) {

        const user = await this.prisma.vi_usuario.findUnique({
            where: {
                correo: email
            }
        });

       if(!user) {
            throw new NotFoundException('Usuario no encontrado');
        }

        const validatePassword = await bcrypt.compare(password, user.contrasena);

        if(!validatePassword) {
            throw new NotFoundException('Contraseña incorrecta');
        }else{
            return {
                message: 'Usuario logueado',
                statusCode: 200,
                user
              };
        }

    }
}
