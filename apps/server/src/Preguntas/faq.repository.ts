import { Injectable } from '@nestjs/common';
import { vi_preguntas_frecuentes } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FAQDto } from './dto/faq.dto';

@Injectable()
export class FaqRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<vi_preguntas_frecuentes[]> {
    return this.prisma.vi_preguntas_frecuentes.findMany({
      where: {
        estaactivo: true,
      },
    });
  }

  async create(data: FAQDto): Promise<vi_preguntas_frecuentes> {
    return this.prisma.vi_preguntas_frecuentes.create({
      data: {
        pregunta: data.pregunta,
        respuesta: data.respuesta,
      },
    });
  }

  async update(id: number, data: FAQDto): Promise<vi_preguntas_frecuentes> {
    return this.prisma.vi_preguntas_frecuentes.update({
      where: {
        id: id,
      },
      data: {
        pregunta: data.pregunta,
        respuesta: data.respuesta,
        fechaultimamodificacion: new Date(),
      },
    });
  }

  async delete(id: number) {
    return this.prisma.vi_preguntas_frecuentes.update({
      where: {
        id: id,
      },
      data: {
        estaactivo: false,
      },
    });
  }
}
