import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { cms_publicacion } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { CreatePublicacionDto } from './dto/pub.dto';

@Injectable()
export class PublicacionService {
  constructor(private prisma: PrismaService) {}

  async getAllPublicaciones(): Promise<cms_publicacion[]> {
    return this.prisma.cms_publicacion.findMany();
  }

  async getPublicacionByID(id: number): Promise<cms_publicacion> {
    return this.prisma.cms_publicacion.findUnique({
      where: {
        idpublicacion: id,
      },
    });
  }

  async createPublicacion(
    data: CreatePublicacionDto,
  ): Promise<cms_publicacion> {
    return this.prisma.cms_publicacion.create({
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

  async updatePublicacion(
    id: number,
    data: cms_publicacion,
  ): Promise<cms_publicacion> {
    return this.prisma.cms_publicacion.update({
      where: {
        idpublicacion: id,
      },
      data,
    });
  }

  async deletePublicacion(id: number): Promise<cms_publicacion> {
    return this.prisma.cms_publicacion.delete({
      where: {
        idpublicacion: id,
      },
    });
  }
}
