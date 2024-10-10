import { Injectable, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { vi_comentario } from "@prisma/client"
import { CreateComentarioDto } from './dto/comentario.dto';

@Injectable()
export class ComentarioService {

    constructor (private prisma: PrismaService) {}

    async getAllComentarios(): Promise<vi_comentario[]> {
        return this.prisma.vi_comentario.findMany();
    }

    async getComentarioById(id: number): Promise<vi_comentario> {
        return this.prisma.vi_comentario.findUnique({
            where: {
                id
            }
        })
    }

    async createComentario(data: CreateComentarioDto): Promise<vi_comentario> {
        const usuario = await this.prisma.vi_usuario.findUnique({
            where: { id: data.id_usuario }, 
            select: {
              nombre: true,
              apellido: true, 
            },
          });
        
        return this.prisma.vi_comentario.create({
            data:{
                id_usuario: data.id_usuario,
                id_publicacion: data.id_publicacion,
                comentario: data.comentario,
                estaactivo: true,
                estadoaprobacion: data.estadoaprobacion,
                nombreautor: `${usuario.nombre} ${usuario.apellido}`,
            }
        });
    }

    async updateComentario (id: number, data: vi_comentario): Promise<vi_comentario> {
        return this.prisma.vi_comentario.update({
            where: {
                id
            },
            data
        })
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
            id_publicacion: id,  // Filtramos los comentarios por el id_publicacion
            estaactivo: true,    // Opcional: solo comentarios activos
          },
          include: {
            vi_usuario: {
              select: {
                nombre: true,   // Opcional: puedes incluir el nombre del autor
                apellido: true, // Opcional: puedes incluir el apellido del autor
              },
            },
          },
        });
      }

}
