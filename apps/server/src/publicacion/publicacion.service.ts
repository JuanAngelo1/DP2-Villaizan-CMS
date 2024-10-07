import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { vi_publicacion } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { CreatePublicacionDto } from './dto/pub.dto';
import { GoogleDriveHelper } from '../utils/google-drive.helper';
import * as fs from 'fs';

@Injectable()
export class PublicacionService {
  private googleDriveHelper: GoogleDriveHelper;
  constructor(private prisma: PrismaService) {
    this.googleDriveHelper = new GoogleDriveHelper();
  }

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

  async createPublicacion(
    data: CreatePublicacionDto,
    file: Express.Multer.File,
  ): Promise<vi_publicacion> {
    try {
      const imageUrl = await this.googleDriveHelper.uploadFile(
        '.',
        file.originalname,
      );

      const nuevaPublicacion = this.prisma.vi_publicacion.create({
        data: {
          titulo: data.titulo,
          urlimagen: imageUrl,
          descripcion: data.descripcion,
          fechapublicacion: data.fechapublicacion,
          id_categoria_publicacion: data.idcategoria,
          id_tipo_publicacion: data.idtipopublicacion,
          id_estado_publicacion: data.idestadopublicacion,
        },
      });

      fs.unlinkSync(file.path);
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
