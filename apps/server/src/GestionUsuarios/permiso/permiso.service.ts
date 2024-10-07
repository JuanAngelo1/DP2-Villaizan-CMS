import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { vi_permiso } from '@prisma/client';
import { vi_rol_permiso } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PermisoService {

    constructor (private prisma: PrismaService) {}


    // Asociar un permiso a un rol en la tabla intermedia
    async assignPermisoToRol(rolId: string, permisoId: string) {
        return this.prisma.vi_rol_permiso.create({
        data: {
            id_rol: rolId,
            id_permiso: permisoId,
        },
        });
    }

    async getAllPermision(): Promise<vi_permiso[]> {
        return this.prisma.vi_permiso.findMany();
    }

    async getPermissionByID(id: string): Promise<vi_permiso> {
        return this.prisma.vi_permiso.findUnique({
            where: {
                id
            }
        })
    }

    async getPermissionByName(nombre: string): Promise<vi_permiso> {
        return this.prisma.vi_permiso.findFirst({
            where: {
                nombre
            }
        })
    }

    async createPermission(name: string): Promise<any> {
        const generatedId = `prm-${uuidv4().split('-')[0]}`;

        return this.prisma.vi_permiso.create({
            data: {
                id: generatedId,
                nombre:name,
                estaactivo: true,
                usuariocreacion: '2A'
            }
        })        
      }



    async updateRol (id: string, data: vi_permiso): Promise<vi_permiso> {
        return this.prisma.vi_permiso.update({
            where: {
                id
            },
            data
        })
    }

    async deleteRol (id: string): Promise<vi_permiso> {
        return this.prisma.vi_permiso.delete({
            where: {
                id
            }
        })
    }


    async findByNombre(nombre: string): Promise<vi_permiso | null> {
        return this.prisma.vi_permiso.findFirst({
            where: {
                nombre,
            }
        });
    }


}
