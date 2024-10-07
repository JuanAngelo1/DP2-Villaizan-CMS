import { Injectable } from '@nestjs/common';
import { vi_categoria_publicacion } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CategoriaDto } from './dto/categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(private prisma: PrismaService) {}

  async getAllCategorias() {
    return this.prisma.vi_categoria_publicacion.findMany({
      where: {
        estaactivo: true,
      },
    });
  }

  async createCategoria(data: CategoriaDto): Promise<vi_categoria_publicacion> {
    try {
      const nuevaCategoria = this.prisma.vi_categoria_publicacion.create({
        data: {
          nombre: data.nombre,
          descripcion: data.descripcion,
          color: data.color,
        },
      });
      return nuevaCategoria;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateCategoria(
    id: number,
    data: CategoriaDto,
  ): Promise<vi_categoria_publicacion> {
    return this.prisma.vi_categoria_publicacion.update({
      where: {
        id: id,
      },
      data: {
        nombre: data.nombre,
        descripcion: data.descripcion,
        color: data.color,
      },
    });
  }

  async deleteCategoria(id: number): Promise<vi_categoria_publicacion> {
    try {
      return this.prisma.vi_categoria_publicacion.update({
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
