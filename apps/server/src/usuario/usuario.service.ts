import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { vi_usuario } from "@prisma/client"

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

    async createUsuario (data: vi_usuario): Promise<vi_usuario> {
        return this.prisma.vi_usuario.create({
            data
        })
    
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
