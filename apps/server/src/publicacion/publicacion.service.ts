import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { vi_publicacion } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { CreatePublicacionDto } from './dto/pub.dto';
import { GoogleDriveHelper } from '../utils/google-drive.helper';
import * as fs from 'fs';

@Injectable()
export class PublicacionService {
  constructor(private prisma: PrismaService) {}

  async getAllPublicaciones(): Promise<vi_publicacion[]> {
    return this.prisma.vi_publicacion.findMany();
  }

  async getPublicacionByID(id: number): Promise<vi_publicacion> {
    return this.prisma.vi_publicacion.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getFirstsEditedPublicacion(numero: number): Promise<vi_publicacion[]> {
    return this.prisma.vi_publicacion.findMany({
      where: {
        estaactivo: true,
      },
      take: numero,
      orderBy: {
        fechaultimamodificacion: 'desc',
      },
    });
  }

  async createPublicacion(data: CreatePublicacionDto): Promise<vi_publicacion> {
    try {
      const nuevaPublicacion = this.prisma.vi_publicacion.create({
        data: {
          titulo: data.titulo,
          urlimagen: data.urlimagen,
          descripcion: data.descripcion,
          fechapublicacion: data.fechapublicacion,
          id_categoria_publicacion: data.id_categoriapublicacion,
          id_tipo_publicacion: data.id_tipopublicacion,
          id_estado_publicacion: data.id_estadopublicacion,
          id_usuario: data.id_usuario
        },
      });
      return nuevaPublicacion;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updatePublicacion(
    id: number,
    data: vi_publicacion,
  ): Promise<vi_publicacion> {
    return this.prisma.vi_publicacion.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async deletePublicacion(id: number): Promise<vi_publicacion> {
    return this.prisma.vi_publicacion.delete({
      where: {
        id: id,
      },
    });
  }
}
