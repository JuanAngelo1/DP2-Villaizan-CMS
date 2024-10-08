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
            return {
                status:"Error",
                message: "Usuario no encontrado",
                result:[]
            }
        }

        const validatePassword = await bcrypt.compare(password, user.contrasena);

        if(!validatePassword){
            return {
                status:"Error",
                message: "Contraseña incorrecta",
                result:[]
            }
        }
        
        const payload = { id: user.id, email: user.correo };
        const token = this.jwtService.sign(payload);

        return {
                status: 'Success',
                message: "Usuario correctamente autenticado",
                token: token,
                user
              };
        

    }
}
