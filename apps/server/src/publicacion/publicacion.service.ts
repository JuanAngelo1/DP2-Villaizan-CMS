import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { vi_publicacion } from "@prisma/client"
import { v4 as uuidv4 } from 'uuid';
import { CreatePublicacionDto } from './dto/pub.dto';


@Injectable()
export class PublicacionService {

    constructor (private prisma: PrismaService) {}

    async getAllPublicaciones(): Promise<vi_publicacion[]> {
        return this.prisma.vi_publicacion.findMany();
    }

    async getPublicacionByID(id: number): Promise<vi_publicacion> {
        return this.prisma.vi_publicacion.findUnique({
            where: {
                idpublicacion: id
            }
        })
    }

    async createPublicacion(data: CreatePublicacionDto): Promise<vi_publicacion> {

        return this.prisma.vi_publicacion.create({
          data: {
            titulo: data.titulo,
            urlimagen: data.urlimagen,
            descripcion: data.descripcion,
            fechapublicacion: data.fechapublicacion,
            idcategoria: data.idcategoria,
            idtipopublicacion: data.idtipopublicacion,
            idestadopublicacion: data.idestadopublicacion,
          },
        });
      }


    async updatePublicacion (id: number, data: vi_publicacion): Promise<vi_publicacion> {
        return this.prisma.vi_publicacion.update({
            where: {
                idpublicacion: id
            },
            data
        })
    }

    async deletePublicacion (id: number): Promise<vi_publicacion> {
        return this.prisma.vi_publicacion.delete({
            where: {
                idpublicacion: id
            }
        })
    }
}
