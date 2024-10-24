import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { vi_etiqueta_publicacion } from '@prisma/client';

@Injectable()
export class EtiquetaRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<vi_etiqueta_publicacion[]> {
    return this.prisma.vi_etiqueta_publicacion.findMany({
      where: {
        estaactivo: true,
      },
    });
  }
}
