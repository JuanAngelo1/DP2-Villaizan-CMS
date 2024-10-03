import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { vi_usuario } from "@prisma/client"
import { CreateUsuarioDto } from './dto/usuario.dto';
import { v4 as uuidv4 } from 'uuid'; 

@Injectable()
export class UsuarioService {

    constructor (private prisma: PrismaService) {}

    async getAllUsers(): Promise<vi_usuario[]> {
        return this.prisma.vi_usuario.findMany();
    }

    async getUsuarioByID(id: string): Promise<vi_usuario> {
        return this.prisma.vi_usuario.findUnique({
            where: {
                id
            }
        })
    }

    async createUsuario(data: CreateUsuarioDto): Promise<vi_usuario> {
        const generatedId = `us-${uuidv4().split('-')[0]}`;
        const generatedPersonaId = `per-${uuidv4().split('-')[0]}`;
        
        await this.prisma.vi_persona.create({
          data: {
            id: generatedPersonaId,
            estado: 'activo',
            usuariocreacion: '2A',
          },
        });

        return this.prisma.vi_usuario.create({
          data: {
            id: generatedId,
            nombre: data.nombre,
            apellido: data.apellido,
            concuenta: true,
            numerotelefono: data.numerotelefono,
            correo: data.correo,
            contrasena: data.contrasena,
            id_persona: generatedPersonaId,
            usuariocreacion: '2A',
          },
        });
      }
    

    async updateUsuario (id: string, data: vi_usuario): Promise<vi_usuario> {
        return this.prisma.vi_usuario.update({
            where: {
                id
            },
            data
        })
    }

    async deleteUsuario (id: string): Promise<vi_usuario> {
        return this.prisma.vi_usuario.delete({
            where: {
                id
            }
        })
    }

}
