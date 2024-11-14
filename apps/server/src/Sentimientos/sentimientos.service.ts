import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { vi_sentimiento } from '@prisma/client';

@Injectable()
export class SentimientosService {
    
    constructor(private prisma: PrismaService) {}

    async getAllSentimientos(): Promise<any[]> {
        const sentimientos = await this.prisma.vi_sentimiento.findMany({
          where: {
            estaactivo: true,
          }
        });
        return sentimientos;
      }

}
