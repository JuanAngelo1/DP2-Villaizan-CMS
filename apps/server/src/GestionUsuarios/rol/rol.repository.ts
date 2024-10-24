import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { vi_rol } from '@prisma/client';

@Injectable()
export class RolRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<vi_rol[]> {
    return this.prisma.vi_rol.findMany({
      where: {
        estaactivo: true,
      },
    });
  }
}
