import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { cms_publicacion } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { CreatePublicacionDto } from './dto/pub.dto';
import { GoogleDriveHelper } from '../utils/google-drive.helper';

@Injectable()
export class PublicacionService {
  private googleDriveHelper: GoogleDriveHelper;
  constructor(private prisma: PrismaService) {
    this.googleDriveHelper = new GoogleDriveHelper();
  }

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
    file: Express.Multer.File,
  ): Promise<cms_publicacion> {
    try {
      const imageUrl = await this.googleDriveHelper.uploadFile(
        file.path,
        file.originalname,
      );

      const nuevaPublicacion = await this.prisma.cms_publicacion.create({
        data: {
          titulo: data.titulo,
          urlimagen: imageUrl,
          descripcion: data.descripcion,
          fechapublicacion: data.fechapublicacion,
          idcategoria: data.idcategoria,
          idtipopublicacion: data.idtipopublicacion,
          idestadopublicacion: data.idestadopublicacion,
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
