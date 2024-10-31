import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { vi_puntosventa } from '@prisma/client';
import { PuntosDto } from './dto/puntos.dto';

@Injectable()
export class PuntosVentaService {

    constructor(private prisma: PrismaService) {}
    
    async getAllPuntos() {
        return this.prisma.vi_puntosventa.findMany({
          where: {
            esactivo: true,
          },
          select: {
            nombre: true,
            direccion: true,
            latitud: true,
            longitud: true,
            nota: true,
          },
        });
    }

    async createPunto(data: PuntosDto): Promise<vi_puntosventa> {
        return this.prisma.vi_puntosventa.create({
          data: {
            nombre: data.nombre,
            direccion: data.direccion,
            latitud: data.latitud,
            longitud: data.longitud,
            nota: data.nota,
            esactivo: true
          },
        });
    }

    async updatePunto( id: number, data: PuntosDto): Promise<vi_puntosventa> {
        return this.prisma.vi_puntosventa.update({
          where: {
            id: id,
          },
          data: {
            nombre: data.nombre,
            direccion: data.direccion,
            latitud: data.latitud,
            longitud: data.longitud,
            nota: data.nota,
          },
        });
    }

    async deletePunto(id: number): Promise<vi_puntosventa> {
        try {
          return this.prisma.vi_puntosventa.update({
            where: {
              id: id,
            },
            data: {
                esactivo: false,
            },
          });
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    

}
