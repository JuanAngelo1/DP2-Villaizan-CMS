import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { vi_comentario } from '@prisma/client';
import { CreateComentarioDto } from './dto/comentario.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ComentarioService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async getAllComentarios(): Promise<any[]> {
    const comentarios = await this.prisma.vi_comentario.findMany({
      orderBy: {
        fechacreacion: 'desc',
      },
    });

    // Iterar sobre los comentarios y agregar el usuario y la publicación a partir de los ids
    const comentariosConUsuariosYPublicaciones = await Promise.all(
      comentarios.map(async (comentario) => {
        const usuario = await this.prisma.vi_usuario.findUnique({
          where: { id: comentario.id_usuario },
        });

        const publicacion = await this.prisma.vi_publicacion.findUnique({
          where: { id: comentario.id_publicacion },
        });

        return {
          id: comentario.id,
          comentario: comentario.comentario,
          estadoaprobacion: comentario.estadoaprobacion,
          nombreautor: comentario.nombreautor,
          estaactivo: comentario.estaactivo,
          fechacreacion: comentario.fechacreacion,
          id_sentimiento: comentario.id_sentimiento,
          usuario,
          publicacion,
        };
      }),
    );

    return comentariosConUsuariosYPublicaciones;
  }

  async getComentarioById(id: number): Promise<any> {
    const comentario = await this.prisma.vi_comentario.findUnique({
      where: { id },
      include: {
        vi_usuario: true, // Incluir el objeto usuario relacionado
        vi_publicacion: true, // Incluir el objeto publicacion relacionado
      },
    });

    // Construir la respuesta personalizada
    return {
      id: comentario.id,
      comentario: comentario.comentario,
      fechacreacion: comentario.fechacreacion,
      estadoaprobacion: comentario.estadoaprobacion,
      nombreautor: comentario.nombreautor,
      estaactivo: comentario.estaactivo,
      usuario: comentario.vi_usuario, // Cambiar el nombre a "usuario"
      publicacion: comentario.vi_publicacion, // Cambiar el nombre a "publicacion"
    };
  }

  async createComentario(data: CreateComentarioDto): Promise<any> {
    const usuario = await this.prisma.vi_usuario.findUnique({
      where: { id: data.id_usuario },
      select: {
        nombre: true,
        apellido: true,
      },
    });

    const response = await firstValueFrom(
      this.httpService.post(
        'http://flask.heladosvillaizan.tech/clasificar-sentimiento',
        {
          comentario: data.comentario,
        },
      ),
    );

    const nombreSentimiento = response.data.sentiment;
    console.log(nombreSentimiento);
    const sentimiento = await this.prisma.vi_sentimiento.findFirst({
      where: {
        nombre: nombreSentimiento,
      },
    });

    const comentario = await this.prisma.vi_comentario.create({
      data: {
        id_usuario: data.id_usuario,
        id_publicacion: data.id_publicacion,
        comentario: data.comentario,
        estaactivo: true,
        id_sentimiento: sentimiento.id,
        nombreautor: `${usuario.nombre} ${usuario.apellido}`,
      },
    });
    console.log(sentimiento);

    return {
      ...comentario,
      sentimiento: sentimiento.nombre,
    };
  }

  async updateComentario(
    id: number,
    data: vi_comentario,
  ): Promise<vi_comentario> {
    return this.prisma.vi_comentario.update({
      where: {
        id,
      },
      data,
    });
  }

  async softDeleteComentario(id: number): Promise<vi_comentario> {
    return this.prisma.vi_comentario.update({
      where: { id },
      data: {
        estaactivo: false,
      },
    });
  }

  async getComentariosByPublicacion(id: number): Promise<vi_comentario[]> {
    return this.prisma.vi_comentario.findMany({
      where: {
        id_publicacion: id,
        estaactivo: true,
      },
      include: {
        vi_usuario: {
          select: {
            nombre: true,
            apellido: true,
          },
        },
      },
    });
  }

  async verifyComentario(comentario: string): Promise<any> {}

  async updateSentimiento(
    id_comentario: number,
    id_sentimiento: number,
  ): Promise<any> {
    return this.prisma.vi_comentario.update({
      where: {
        id: id_comentario,
      },
      data: {
        id_sentimiento: id_sentimiento,
      },
    });
  }

  async countComentariosBetweenDates(
    fechaInicio: Date,
    fechaFin: Date,
  ): Promise<number> {
    return this.prisma.vi_comentario.count({
      where: {
        fechacreacion: {
          gte: fechaInicio,
          lte: fechaFin,
        },
        estaactivo: true,
      },
    });
  }

  async getComentariosBetweenDates(
    fechaInicio: Date,
    fechaFin: Date,
  ): Promise<vi_comentario[]> {
    return this.prisma.vi_comentario.findMany({
      where: {
        fechacreacion: {
          gte: fechaInicio,
          lte: fechaFin,
        },
        estaactivo: true,
        estadoaprobacion: true,
      },
    });
  }
}
