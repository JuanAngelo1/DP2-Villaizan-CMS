import { Injectable } from '@nestjs/common';
import { vi_villaparada } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { VillaParadaDTO } from './dto/villaparada.dto';
import { AgregarPuntosDTO } from './dto/agregarpuntos.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class VillaparadaRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<vi_villaparada[]> {
    return this.prisma.vi_villaparada.findMany({
      where: {
        estaactivo: true,
      },
    });
  }

  async create(data: VillaParadaDTO): Promise<vi_villaparada> {
    return this.prisma.vi_villaparada.create({
      data: {
        nombre: data.nombre,
        latitud: data.latitud,
        longitud: data.longitud,
        nota: data.nota,
        estaactivo: true,
        direccion: data.direccion,
        id_fruta: data.id_fruta,
      },
    });
  }

  async update(id: number, data: VillaParadaDTO): Promise<vi_villaparada> {
    return this.prisma.vi_villaparada.update({
      where: {
        id: id,
      },
      data: {
        nombre: data.nombre,
        latitud: data.latitud,
        longitud: data.longitud,
        nota: data.nota,
        direccion: data.direccion,
        id_fruta: data.id_fruta,
        fechaultimamodificacion: new Date(),
      },
    });
  }

  async delete(id: number): Promise<vi_villaparada> {
    return this.prisma.vi_villaparada.update({
      where: {
        id: id,
      },
      data: {
        estaactivo: false,
        fechaultimamodificacion: new Date(),
      },
    });
  }

  async sumarPuntos(data: AgregarPuntosDTO) {
    try {
      await this.prisma.vi_villaparada_x_usuario.create({
        data: {
          id_usuario: data.id_usuario,
          id_villaparada: data.id_villaparada,
          cantitadpuntos: data.puntos,
          latitud: data.latitud,
          longitud: data.longitud,
        },
      });
      return { success: true };
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        // Si es el error de violación de restricción única
        return {
          success: false,
        };
      }
      throw error; // Rethrow el error si no es el esperado
    }
  }
}
