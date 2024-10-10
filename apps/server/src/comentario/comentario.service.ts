import { Injectable, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { vi_comentario } from "@prisma/client"
import { CreateComentarioDto } from './dto/comentario.dto';

@Injectable()
export class ComentarioService {

    constructor (private prisma: PrismaService) {}

    async getAllComentarios(): Promise<any[]> {
      const comentarios = await this.prisma.vi_comentario.findMany();
  
      // Iterar sobre los comentarios y agregar el usuario y la publicación a partir de los ids
      const comentariosConUsuariosYPublicaciones = await Promise.all(
          comentarios.map(async (comentario) => {
              const usuario = await this.prisma.vi_usuario.findUnique({
                  where: { id: comentario.id_usuario }
              });
  
              const publicacion = await this.prisma.vi_publicacion.findUnique({
                  where: { id: comentario.id_publicacion }
              });
  
              return {
                id: comentario.id,
                comentario: comentario.comentario,
                fecha: comentario.fecha,
                estadoaprobacion: comentario.estadoaprobacion,
                nombreautor: comentario.nombreautor,
                estaactivo: comentario.estaactivo,
                usuario, 
                publicacion 
              };
          })
      );
  
      return comentariosConUsuariosYPublicaciones;
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
