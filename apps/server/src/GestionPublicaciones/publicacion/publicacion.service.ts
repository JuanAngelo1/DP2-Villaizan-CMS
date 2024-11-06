import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { vi_publicacion } from '@prisma/client';

import {vi_categoria_publicacion} from '@prisma/client';
import {vi_etiqueta_publicacion} from '@prisma/client';
import {vi_publicacion_x_categoria} from '@prisma/client';
import {vi_publicacion_x_etiqueta} from '@prisma/client';

import { vi_estado_version } from '@prisma/client';
import { vi_tipo_publicacion } from '@prisma/client';
import { vi_version_publicacion } from '@prisma/client';

import { v4 as uuidv4 } from 'uuid';
import { VersionDto } from './dto/pub.dto';
import { PublicacionDto } from './dto/publicacion.dto';
import { GoogleDriveHelper } from '../../utils/google-drive.helper';
import { UpdateVersionDto } from './dto/update-version.dto';

import * as fs from 'fs';

@Injectable()
export class PublicacionService {
  constructor(private prisma: PrismaService) {}

  async getAllPublicaciones(): Promise<any[]> {
    const publicaciones = await this.prisma.vi_publicacion.findMany({
      where: {
        estaactivo: true,
      }
    });
    return publicaciones;
  }
  
  async getPublicacionByID(id: number): Promise<any> {
    const publicacion = await this.prisma.vi_publicacion.findUnique({
      where: {
        id: id,
      },

    });
  
    return publicacion;
  }

  async getAllVersiones(publicacionId: number) {
    const versiones = await this.prisma.vi_version_publicacion.findMany({
      where: {
        id_publicacion: publicacionId,
      },
      orderBy: {
        fechaultimamodificacion: 'desc',
      },
      select: {
        id: true,
        fechaultimamodificacion: true,
        titulo: true,
        descripcion: true,
        slug: true,
        fechapublicacion: true,
        estaactivo: true,
        vi_estado_version: {
          select: {
            nombre: true,
          },
        },
      },
    });
  
    return versiones.map(version => ({
      id: version.id,
      fechaultimamodificacion: version.fechaultimamodificacion,
      titulo: version.titulo,
      descripcion: version.descripcion,
      slug: version.slug,
      fechapublicacion: version.fechapublicacion,
      estaactivo: version.estaactivo,
      estado: version.vi_estado_version.nombre, // Extraemos el nombre del estado directamente
    }));
  }
  
  async getVersionbyID(id: number): Promise<any> {
    const version = await this.prisma.vi_version_publicacion.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        fechaultimamodificacion: true,
        titulo: true,
        descripcion: true,
        slug: true,
        fechapublicacion: true,
        estaactivo: true,
        richtext:true,
        vi_estado_version: {
          select: {
            nombre: true,  // Trae solo el nombre del estado
          },
        },
        vi_imagen_version: {
          select: {
            id: true,
            urlimagen: true,
            descripcion: true,
            fechacreacion: true,
          },
        },
      },
    });
  
    // Reestructuramos el resultado para sacar el nombre del estado directamente
    return {
      id: version.id,
      fechaultimamodificacion: version.fechaultimamodificacion,
      titulo: version.titulo,
      descripcion: version.descripcion,
      slug: version.slug,
      richtext: version.richtext,
      fechapublicacion: version.fechapublicacion,
      estaactivo: version.estaactivo,
      estado: version.vi_estado_version.nombre,  // Extraemos el nombre del estado directamente
      imagenes: version.vi_imagen_version,  // Incluimos las imágenes directamente
    };
  }
  
  async createOnlyPublicacion(data: PublicacionDto): Promise<any> {
    try{

      // Creación de la publicación
      const nuevaPublicacion = await this.prisma.vi_publicacion.create({
          data: {
              id_tipo_publicacion: data.id_tipopublicacion,
              id_usuario: data.id_usuario,
              descripcion: data.descripcion,
              nombrereferencia: data.nombrereferencia,
              estaactivo: true,  // Publicación activa por defecto
              archivado: false,  // No archivada por defecto
            },
      });
      return nuevaPublicacion;
    } catch (error) {
        console.error('Error al crear la publicación:', error);
        throw error;
    }
  }

  async createVersion(data: VersionDto): Promise<any> {
    try {
      // Obtener el estado "Borrador" para asignarlo a la versión
      const estadoBorrador = await this.prisma.vi_estado_version.findFirst({
        where: { nombre: 'Borrador' },
      });
  
      if (!estadoBorrador) {
        throw new Error('Estado "Borrador" no encontrado');
      }
  
      // Crear la versión de la publicación
      const versionCreada = await this.prisma.vi_version_publicacion.create({
        data: {
          id_publicacion: data.id_publicacion,
          id_estado: estadoBorrador.id,
          titulo: data.titulo,
          urlimagen: data.urlimagen,
          descripcion: data.descripcionSEO,
          richtext: data.richtext,
          slug: data.slug,
          fechaultimamodificacion: new Date(),
          estaactivo: true,
        },
      });
  
      // Relacionar las categorías
      if (data.categorias && data.categorias.length > 0) {
        for (const nombreCategoria of data.categorias) {
          const categoria = await this.prisma.vi_categoria_publicacion.findFirst({
            where: { nombre: nombreCategoria },
          });
          if (categoria) {
            await this.prisma.vi_publicacion_x_categoria.create({
              data: {
                id_version: versionCreada.id,
                id_categoria: categoria.id,
              },
            });
          } else {
            console.error(`Categoría no encontrada: ${nombreCategoria}`);
          }
        }
      }
  
      // Relacionar las etiquetas
      if (data.etiquetas && data.etiquetas.length > 0) {
        for (const nombreEtiqueta of data.etiquetas) {
          const etiqueta = await this.prisma.vi_etiqueta_publicacion.findFirst({
            where: { nombre: nombreEtiqueta },
          });
          if (etiqueta) {
            await this.prisma.vi_publicacion_x_etiqueta.create({
              data: {
                id_version: versionCreada.id,
                id_etiqueta: etiqueta.id,
              },
            });
          } else {
            console.error(`Etiqueta no encontrada: ${nombreEtiqueta}`);
          }
        }
      }
  
      // Agregar las imágenes relacionadas a la versión
      if (data.imagenes && data.imagenes.length > 0) {
        for (const url of data.imagenes) {
          await this.prisma.vi_imagen_version.create({
            data: {
              id_version: versionCreada.id,
              urlimagen: url,
              fechacreacion: new Date(),
            },
          });
        }
      }
  
      // Obtener la versión completa con categorías, etiquetas e imágenes incluidas sin relaciones intermedias
      const versionCompleta = await this.prisma.vi_version_publicacion.findUnique({
        where: { id: versionCreada.id },
        include: {
          vi_publicacion_x_categoria: {
            select: {
              vi_categoria_publicacion: true,
            },
          },
          vi_publicacion_x_etiqueta: {
            select: {
              vi_etiqueta_publicacion: true,
            },
          },
          vi_imagen_version: true,
        },
      });
  
      // Reestructurar el resultado para que no incluya las relaciones intermedias
      const resultado = {
        id: versionCompleta.id,
        id_publicacion: versionCompleta.id_publicacion,
        id_estado: versionCompleta.id_estado,
        titulo: versionCompleta.titulo,
        urlimagen: versionCompleta.urlimagen,
        descripcion: versionCompleta.descripcion,
        slug: versionCompleta.slug,
        fechacreacion: versionCompleta.fechacreacion,
        fechaultimamodificacion: versionCompleta.fechaultimamodificacion,
        estaactivo: versionCompleta.estaactivo,
        richtext: versionCompleta.richtext,
        fechapublicacion: versionCompleta.fechapublicacion,
        categorias: versionCompleta.vi_publicacion_x_categoria.map((categoriaRel) => categoriaRel.vi_categoria_publicacion),
        etiquetas: versionCompleta.vi_publicacion_x_etiqueta.map((etiquetaRel) => etiquetaRel.vi_etiqueta_publicacion),
        imagenes: versionCompleta.vi_imagen_version,
      };
  
      return {
        status: 'Success',
        message: 'Versión creada exitosamente',
        result: resultado,
      };
    } catch (error) {
      console.error('Error al crear la versión:', error);
      throw error;
    }
  }
  

  async updateVersion(id_version: number, data: UpdateVersionDto): Promise<any> {
    try {
      // Actualizar los datos principales de la versión
      const versionActualizada = await this.prisma.vi_version_publicacion.update({
        where: { id: id_version },
        data: {
          titulo: data.titulo,
          urlimagen: data.urlimagen,
          descripcion: data.descripcionSEO,
          richtext: data.richtext,
          slug: data.slug,
          fechaultimamodificacion: new Date(),
          fechapublicacion: data.fechapublicacion,
        },
      });
  
      // Actualizar las categorías asociadas
      if (data.categorias && data.categorias.length > 0) {
        // Eliminar categorías existentes
        await this.prisma.vi_publicacion_x_categoria.deleteMany({
          where: { id_version: id_version },
        });
  
        // Agregar las nuevas categorías
        for (const nombreCategoria of data.categorias) {
          const categoria = await this.prisma.vi_categoria_publicacion.findFirst({
            where: { nombre: nombreCategoria },
          });
          if (categoria) {
            await this.prisma.vi_publicacion_x_categoria.create({
              data: {
                id_version: id_version,
                id_categoria: categoria.id,
              },
            });
          } else {
            console.error(`Categoría no encontrada: ${nombreCategoria}`);
          }
        }
      }
  
      // Actualizar las etiquetas asociadas
      if (data.etiquetas && data.etiquetas.length > 0) {
        // Eliminar etiquetas existentes
        await this.prisma.vi_publicacion_x_etiqueta.deleteMany({
          where: { id_version: id_version },
        });
  
        // Agregar las nuevas etiquetas
        for (const nombreEtiqueta of data.etiquetas) {
          const etiqueta = await this.prisma.vi_etiqueta_publicacion.findFirst({
            where: { nombre: nombreEtiqueta },
          });
          if (etiqueta) {
            await this.prisma.vi_publicacion_x_etiqueta.create({
              data: {
                id_version: id_version,
                id_etiqueta: etiqueta.id,
              },
            });
          } else {
            console.error(`Etiqueta no encontrada: ${nombreEtiqueta}`);
          }
        }
      }
  
      // Actualizar las imágenes asociadas
      if (data.imagenes && data.imagenes.length > 0) {
        // Eliminar imágenes existentes
        await this.prisma.vi_imagen_version.deleteMany({
          where: { id_version: id_version },
        });
  
        // Agregar las nuevas imágenes
        for (const url of data.imagenes) {
          await this.prisma.vi_imagen_version.create({
            data: {
              id_version: id_version,
              urlimagen: url,
              fechacreacion: new Date(),
            },
          });
        }
      }
  
    return versionActualizada;

    } catch (error) {
      console.error('Error al actualizar la versión:', error);
      throw error;
    }
  }
  

  async getFirstsEditedPublicacion(numero: number) {
      const publicaciones = await this.prisma.vi_publicacion.findMany({
        take: numero,
        select: {
          id: true,
          vi_version_publicacion: {
            orderBy: {
              fechaultimamodificacion: 'desc',  
            },
            take: 1,  
            select: {
              titulo: true,
              slug: true,
              fechaultimamodificacion: true,
            }
          }
        }
      });
      return publicaciones;
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



  async deletePublicacion(id: number): Promise<vi_publicacion> {
    return this.prisma.vi_publicacion.delete({
      where: {
        id: id,
      },
    });
  }


  async archivarPublicacion(id: number): Promise<vi_publicacion> {
     const publicacionActualizada = await this.prisma.vi_publicacion.update({
            where: { id: id },
            data: {
                archivado: true
            },
        });
      return publicacionActualizada;
  }

  async desarchivarPublicacion(id: number): Promise<vi_publicacion> {
    const publicacionActualizada = await this.prisma.vi_publicacion.update({
           where: { id: id },
           data: {
               archivado: false
           },
       });
     return publicacionActualizada;
 }


  async listarTodosEstadosPublicacion(): Promise<vi_version_publicacion[]> {
    try {
        return this.prisma.vi_version_publicacion.findMany();
    } catch (error) {
        console.error('Error al listar los estados de version:', error);
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

  async getPublicacionesConVersionesRecientes() {
    const publicaciones = await this.prisma.vi_publicacion.findMany({
      select: {
        id: true,
        vi_version_publicacion: {
          orderBy: {
            fechaultimamodificacion: 'desc',
          },
          take: 1, 
          select: {
            titulo: true,
            slug: true,
            fechaultimamodificacion: true,
          }
        }
      }
    });

    return publicaciones;
  }

}
