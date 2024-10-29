import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { vi_preguntas_frecuentes } from '@prisma/client';
import { FAQDto } from './dto/faq.dto';

@Injectable()
export class FaqService {

    constructor(private prisma: PrismaService) {}

    async getAllFAQs() {
        return this.prisma.vi_preguntas_frecuentes.findMany({
          where: {
            estaactivo: true,
          },
        });
    }

    async createFAQ(data: FAQDto): Promise<vi_preguntas_frecuentes> {
        try {
          const nuevaFAQ = this.prisma.vi_preguntas_frecuentes.create({
            data: {
              pregunta: data.pregunta,
              respuest: data.respuesta,
            },
          });
          return nuevaFAQ;
        } catch (error) {
            console.error('Error al crear la publicación:', error);
            throw error;
        }
      }

    async deleteFAQ(id: number): Promise<vi_preguntas_frecuentes> {
        try {
          return this.prisma.vi_preguntas_frecuentes.update({
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

    async updateFAQ(
        id: number,
        data: FAQDto,
      ): Promise<vi_preguntas_frecuentes> {
        return this.prisma.vi_preguntas_frecuentes.update({
          where: {
            id: id,
          },
          data: {
            pregunta: data.pregunta,
            respuest: data.respuesta,
          },
        });
      }


}
