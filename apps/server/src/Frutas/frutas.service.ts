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
            informacioneducativa: true
          },
        });
    }

    async getFrutaById(id: string) {
      return await this.prisma.vi_fruta.findUnique({
          where: { id },
          select: {
              id: true,
              nombre: true,
              urlimagen: true,
              descripcion: true,
              informacioneducativa: true,
              
              vi_producto_fruta: {
                  select: {
                      vi_producto: {
                          select: {
                              id: true,
                              nombre: true,
                              urlimagen: true,
                              precioecommerce: true,
                              descripcion: true,
                              
                              vi_promocion: {
                                  where: {
                                      estaactivo: true,
                                      fechainicio: { lte: new Date() },
                                      fechafin: { gte: new Date() },
                                  },
                                  select: {
                                      id: true,
                                      titulo: true,
                                      porcentajedescuento: true,
                                  },
                              },
  
                              // Añadir los combos por producto
                              vi_combo_x_producto: {
                                  select: {
                                      vi_combo: {
                                          select: {
                                              id: true,
                                              titulo: true,
                                              descripcion: true,
                                              precio: true,
                                              fechainicio: true,
                                              fechafin: true,
                                          },
                                      },
                                      cantidad: true,
                                  },
                              },
                          },
                      },
                  },
              },
          },
      });
  }
  
      

}
