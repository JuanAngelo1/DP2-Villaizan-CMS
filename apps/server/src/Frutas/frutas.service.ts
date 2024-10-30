import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { vi_fruta } from '@prisma/client';
import { vi_producto } from '@prisma/client';
import { vi_promocion } from '@prisma/client';
import { vi_producto_fruta } from '@prisma/client';


@Injectable()
export class FrutasService {

    constructor(private prisma: PrismaService) {}

    async getAllFrutas() {
        return this.prisma.vi_fruta.findMany({
          where: {
            estaactivo: true,
          },
          select: {
            nombre: true,
            urlimagen: true,
            descripcion: true,
          },
        });
      }

}
