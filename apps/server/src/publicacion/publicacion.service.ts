import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { vi_publicacion } from '@prisma/client';

import {vi_categoria_publicacion} from '@prisma/client';
import {vi_etiqueta_publicacion} from '@prisma/client';
import {vi_publicacion_x_categoria} from '@prisma/client';
import {vi_publicacion_x_etiqueta} from '@prisma/client';

import { vi_estado_publicacion } from '@prisma/client';
import { vi_tipo_publicacion } from '@prisma/client';

import { v4 as uuidv4 } from 'uuid';
import { CreatePublicacionDto } from './dto/pub.dto';
import { GoogleDriveHelper } from '../utils/google-drive.helper';
import * as fs from 'fs';

@Injectable()
export class PublicacionService {
  constructor(private prisma: PrismaService) {}

  async getAllPublicaciones(): Promise<any[]> {
    const publicaciones = await this.prisma.vi_publicacion.findMany({
      where: {
        estaactivo: true,
      },
      include: {
        vi_publicacion_x_etiqueta: {
          include: {
            vi_etiqueta_publicacion: {
              select: {
                nombre: true,
                descripcion: true,
                colorfondo: true,
                colortexto: true,
              },
            },
          },
        },
        vi_publicacion_x_categoria: { 
          include: {
            vi_categoria_publicacion: {
              select: {
                nombre: true,
                descripcion: true,
                colorfondo: true,
                colortexto: true,
              },
            },
          },
        },
      },
    });
  
    // Mapeamos el resultado para cambiar los nombres de las claves
    return publicaciones.map(publicacion => ({
      ...publicacion,
      etiquetas: publicacion.vi_publicacion_x_etiqueta.map(etiquetaRel => ({
        nombre: etiquetaRel.vi_etiqueta_publicacion.nombre,
        descripcion: etiquetaRel.vi_etiqueta_publicacion.descripcion,
        colorfondo: etiquetaRel.vi_etiqueta_publicacion.colorfondo,
        colortexto: etiquetaRel.vi_etiqueta_publicacion.colortexto,
      })),
      categorias: publicacion.vi_publicacion_x_categoria.map(categoriaRel => ({
        nombre: categoriaRel.vi_categoria_publicacion.nombre,
        descripcion: categoriaRel.vi_categoria_publicacion.descripcion,
        colorfondo: categoriaRel.vi_categoria_publicacion.colorfondo,
        colortexto: categoriaRel.vi_categoria_publicacion.colortexto,
      })),
      vi_publicacion_x_etiqueta: undefined,  // Eliminamos el campo original etiquetas
      vi_publicacion_x_categoria: undefined, // Eliminamos el campo original categorias
    }));
  }
  
  
  async getPublicacionesCantidadComentarios(): Promise<any[]> {
    const publicaciones = await this.prisma.vi_publicacion.findMany();

    const publicacionesConCantidadComentarios = await Promise.all(
        publicaciones.map(async (publicacion) => {
            const cantidadComentarios = await this.prisma.vi_comentario.count({
                where: {
                    id_publicacion: publicacion.id,
                },
            });

            return {
                ...publicacion,
                cantidadComentarios, // Agregamos la cantidad de comentarios
            };
        })
    );

    return publicacionesConCantidadComentarios;
  }

  async getPublicacionByID(id: number): Promise<any> {
    const publicacion = await this.prisma.vi_publicacion.findUnique({
      where: {
        id: id,
      },
      include: {
        vi_publicacion_x_etiqueta: {
          include: {
            vi_etiqueta_publicacion: {
              select: {
                nombre: true,
                descripcion: true,
                colorfondo: true,
                colortexto: true,
              },
            },
          },
        },
        vi_publicacion_x_categoria: {
          include: {
            vi_categoria_publicacion: {
              select: {
                nombre: true,
                descripcion: true,
                colorfondo: true,
                colortexto: true,
              },
            },
          },
        },
      },
    });
  
    return {
      ...publicacion,
      etiquetas: publicacion.vi_publicacion_x_etiqueta.map(etiquetaRel => ({
        nombre: etiquetaRel.vi_etiqueta_publicacion.nombre,
        descripcion: etiquetaRel.vi_etiqueta_publicacion.descripcion,
        colorfondo: etiquetaRel.vi_etiqueta_publicacion.colorfondo,
        colortexto: etiquetaRel.vi_etiqueta_publicacion.colortexto,
      })),
      categorias: publicacion.vi_publicacion_x_categoria.map(categoriaRel => ({
        nombre: categoriaRel.vi_categoria_publicacion.nombre,
        descripcion: categoriaRel.vi_categoria_publicacion.descripcion,
        colorfondo: categoriaRel.vi_categoria_publicacion.colorfondo,
        colortexto: categoriaRel.vi_categoria_publicacion.colortexto,
      })),
      vi_publicacion_x_etiqueta: undefined,  // Eliminamos el campo original
      vi_publicacion_x_categoria: undefined, // Eliminamos el campo original
    };
  }
  

  async getFirstsEditedPublicacion(numero: number): Promise<vi_publicacion[]> {
    return this.prisma.vi_publicacion.findMany({
      where: {
        estaactivo: true,
      },
      take: numero,
      orderBy: {
        fechaultimamodificacion: 'desc',
      },
    });
  }

  async createPublicacion(data: CreatePublicacionDto): Promise<vi_publicacion> {
    try {
        // Creación de la publicación
        const nuevaPublicacion = await this.prisma.vi_publicacion.create({
            data: {
                titulo: data.titulo,
                urlimagen: data.urlimagen,
                descripcionseo: data.descripcionSEO,
                slug: data.slug,
                fechapublicacion: data.fechapublicacion,
                richtext: data.richtext,  // Campo richtext añadido
                id_tipo_publicacion: data.id_tipopublicacion,
                id_estado_publicacion: data.id_estadopublicacion,
                id_usuario: data.id_usuario,
            },
        });

        // Buscar IDs de las categorías por sus nombres
        if (data.categorias && data.categorias.length > 0) {
            for (const nombreCategoria of data.categorias) {
                const categoria = await this.prisma.vi_categoria_publicacion.findFirst({
                    where: { nombre: nombreCategoria }
                });
                if (categoria) {
                    await this.prisma.vi_publicacion_x_categoria.create({
                        data: {
                            id_publicacion: nuevaPublicacion.id,
                            id_categoria_publicacion: categoria.id,  // Usamos el ID de la categoría encontrado
                        },
                    });
                } else {
                    console.error(`Categoría no encontrada: ${nombreCategoria}`);
                }
            }
        }

        // Buscar IDs de las etiquetas por sus nombres
        if (data.etiquetas && data.etiquetas.length > 0) {
            for (const nombreEtiqueta of data.etiquetas) {
                const etiqueta = await this.prisma.vi_etiqueta_publicacion.findFirst({
                    where: { nombre: nombreEtiqueta },
                });
                if (etiqueta) {
                    await this.prisma.vi_publicacion_x_etiqueta.create({
                        data: {
                            id_publicacion: nuevaPublicacion.id,
                            id_etiqueta_publicacion: etiqueta.id,  // Usamos el ID de la etiqueta encontrado
                        },
                    });
                } else {
                    console.error(`Etiqueta no encontrada: ${nombreEtiqueta}`);
                }
            }
        }

        return nuevaPublicacion;
    } catch (error) {
        console.error(error);
        return null;
    }
}

  async updatePublicacion(
    id: number,
    data: vi_publicacion,
  ): Promise<vi_publicacion> {
    return this.prisma.vi_publicacion.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async deletePublicacion(id: number): Promise<vi_publicacion> {
    return this.prisma.vi_publicacion.delete({
      where: {
        id: id,
      },
    });
  }

  async cambiarEstadoPublicacion(id: number, nuevoEstado: number): Promise<vi_publicacion> {
    try {
        const publicacionActualizada = await this.prisma.vi_publicacion.update({
            where: { id: id },
            data: {
                id_estado_publicacion: nuevoEstado,  // Cambiamos el estado de la publicación
                fechaultimamodificacion: new Date(),  // Actualizamos la fecha de modificación
            },
        });
        return publicacionActualizada;
    } catch (error) {
        console.error('Error al cambiar el estado de la publicación:', error);
        throw error;
    }
  }

  async cambiarEstadoArchivado(id: number, archivado: boolean): Promise<vi_publicacion> {
    try {
        const publicacionActualizada = await this.prisma.vi_publicacion.update({
            where: { id: id },
            data: {
                archivado: archivado,  // Cambiamos el estado de archivado
                fechaultimamodificacion: new Date(),  // Actualizamos la fecha de modificación
            },
        });
        return publicacionActualizada;
    } catch (error) {
        console.error('Error al cambiar el estado de archivado:', error);
        throw error;
    }
  }


  async listarTodosEstadosPublicacion(): Promise<vi_estado_publicacion[]> {
    try {
        return this.prisma.vi_estado_publicacion.findMany();
    } catch (error) {
        console.error('Error al listar los estados de publicación:', error);
        throw error;
    }
  }

  async listarTodosTiposPublicacion(): Promise<vi_tipo_publicacion[]> {
    try {
        return this.prisma.vi_tipo_publicacion.findMany();
    } catch (error) {
        console.error('Error al listar los tipos de publicación:', error);
        throw error;
    }
  }





}
