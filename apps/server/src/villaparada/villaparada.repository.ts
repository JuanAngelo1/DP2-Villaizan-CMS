import { Injectable } from '@nestjs/common';
import { vi_villaparada } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { VillaParadaDTO } from './dto/villaparada.dto';

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
}
