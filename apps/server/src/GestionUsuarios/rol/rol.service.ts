import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { vi_rol } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RolService {

    constructor (private prisma: PrismaService) {}

    async getAllRols(): Promise<vi_rol[]> {
        return this.prisma.vi_rol.findMany();
    }

    async getRolByID(id: string): Promise<vi_rol> {
        return this.prisma.vi_rol.findUnique({
            where: {
                id
            }
        })
    }

    async createRol(name: string): Promise<any> {
        const generatedId = `rol-${uuidv4().split('-')[0]}`;

        return this.prisma.vi_rol.create({
            data: {
                id: generatedId,
                nombre:name,
                estaactivo: true,
                usuariocreacion: '2A'
            }
        })        
      }



    async updateRol (id: string, data: vi_rol): Promise<vi_rol> {
        return this.prisma.vi_rol.update({
            where: {
                id
            },
            data
        })
    }

    async deleteRol (id: string): Promise<vi_rol> {
        return this.prisma.vi_rol.delete({
            where: {
                id
            }
        })
    }


    async findByNombre(nombre: string): Promise<vi_rol | null> {
        return this.prisma.vi_rol.findFirst({
            where: {
                nombre,
            }
        });
    }




}
