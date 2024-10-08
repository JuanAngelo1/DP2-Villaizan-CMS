import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EtiquetaDto } from './dto/etiqueta.dto';
import { vi_etiqueta_publicacion } from '@prisma/client';

@Injectable()
export class EtiquetaService {
  constructor(private prisma: PrismaService) {}

  async getAllEtiquetas() {
    return this.prisma.vi_etiqueta_publicacion.findMany({
      where: {
        estaactivo: true,
      },
    });
  }

  async createEtiqueta(data: EtiquetaDto): Promise<vi_etiqueta_publicacion> {
    try {
      const nuevaEtiqueta = this.prisma.vi_etiqueta_publicacion.create({
        data: {
          nombre: data.nombre,
          descripcion: data.descripcion,
          colorfondo: data.colorfondo,
          colortexto: data.colortexto,
        },
      });
      return nuevaEtiqueta;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateEtiqueta(
    id: number,
    data: EtiquetaDto,
  ): Promise<vi_etiqueta_publicacion> {
    return this.prisma.vi_etiqueta_publicacion.update({
      where: {
        id: id,
      },
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        colorfondo: data.colorfondo,
        colortexto: data.colortexto,
      },
    });
  }

  async deleteEtiqueta(id: number): Promise<vi_etiqueta_publicacion> {
    try {
      return this.prisma.vi_etiqueta_publicacion.update({
        where: {
          id: id,
        },
        data: {
          estaactivo: false,
        },
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
