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

import { VersionDto } from './dto/pub.dto';
import { PublicacionDto } from './dto/publicacion.dto';
import { GoogleDriveHelper } from '../../utils/google-drive.helper';
import { UpdateVersionDto } from './dto/update-version.dto';


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
        estaactivo: true,
      },
      orderBy: {
        fechaultimamodificacion: 'asc',
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
        richtext: true,
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
        vi_publicacion_x_categoria: {
          select: {
            vi_categoria_publicacion: {
              select: {
                id: true,
                nombre: true,
                descripcion: true,
                colorfondo: true,
                colortexto: true,
                estaactivo: true,
              },
            },
          },
        },
        vi_publicacion_x_etiqueta: {
          select: {
            vi_etiqueta_publicacion: {
              select: {
                id: true,
                nombre: true,
                descripcion: true,
                colorfondo: true,
                colortexto: true,
                estaactivo: true,
              },
            },
          },
        },
      },
    });
  
    // Reestructuramos el resultado para simplificar el formato de categorías y etiquetas
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
      categorias: version.vi_publicacion_x_categoria.map((item) => item.vi_categoria_publicacion),  // Extraemos las categorías directamente
      etiquetas: version.vi_publicacion_x_etiqueta.map((item) => item.vi_etiqueta_publicacion),  // Extraemos las etiquetas directamente
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

  async createVersion(id: number,data: VersionDto): Promise<any> {
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
          id_publicacion: id,
          id_estado: estadoBorrador.id,
          titulo: data.titulo,
          urlimagen: data.urlimagen,
          descripcion: data.descripcion,
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
          descripcion: data.descripcion,
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

  async publicarVersion(id_publicacion: number, id_version: number): Promise<any> {
    try {
        const estadoPublicado = await this.prisma.vi_estado_version.findFirst({
            where: { nombre: 'Publicacion activa' }
        });

        const estadoBorrador = await this.prisma.vi_estado_version.findFirst({
            where: { nombre: 'Borrador' }
        });

        if (!estadoPublicado || !estadoBorrador) {
            return {
                status: 'Error',
                message: 'Estado "Publicacion activa" o "Borrador" no encontrado',
                result: [],
            };
        }

        // Verificar si ya existe una versión publicada de esta publicación
        const publicacionActual = await this.prisma.vi_version_publicacion.findFirst({
            where: {
                id_estado: estadoPublicado.id,
                id_publicacion: id_publicacion,
            },
        });

        // Verificar si la versión a publicar ya está activa
        if (publicacionActual && publicacionActual.id === id_version) {
            return {
                status: 'Error',
                message: 'Esta versión ya fue publicada',
                result: [],
            };
        }

        // Verificar si ya existe una versión con el mismo slug y estado "Publicacion activa"
        const versionConMismoSlug = await this.prisma.vi_version_publicacion.findFirst({
            where: {
                slug: publicacionActual?.slug,
                id_estado: estadoPublicado.id,
                NOT: { id: id_version }, // Excluir la versión actual
            },
        });

        if (versionConMismoSlug) {
            return {
                status: 'Error',
                message: `El slug "${versionConMismoSlug.slug}" ya está en uso por otra versión activa. Use un slug diferente.`,
                result: [],
            };
        }

        // Si no hay conflictos, publicar la versión
        const versionActualizada = await this.prisma.vi_version_publicacion.update({
            where: { id: id_version },
            data: {
                id_estado: estadoPublicado.id,
                fechaultimamodificacion: new Date(),
            },
        });

        return {
            status: 'Success',
            message: 'Versión publicada correctamente',
            result: versionActualizada,
        };

    } catch (error) {
        console.error('Error al cambiar el estado a "Publicacion activa":', error);
        throw error;
    }
}

    
  async despublicarVersion(id_publicacion: number, id_version: number): Promise<any> {
    try {
      const estadoBorrador = await this.prisma.vi_estado_version.findFirst({
        where: { nombre: 'Borrador' }
      });
  
      if (!estadoBorrador) {
        return {
          status: 'Error',
          message: 'Estado "Borrador" no encontrado en la BD',
          result: [],
        };
      }
  
      const versionActualizada = await this.prisma.vi_version_publicacion.update({
        where: { id: id_version },
        data: {
          id_estado: estadoBorrador.id,
          fechaultimamodificacion: new Date(),
        },
      });
  
      return {
        status: 'Success',
        message: 'Versión despublicada correctamente',
        result: versionActualizada,
      };
      
    } catch (error) {
      console.error('Error al cambiar el estado a "Borrador":', error);
      throw error;
    }
  }

  async duplicarVersion(id_publicacion: number, id_version: number): Promise<any> {
    try {
      // Obtener la versión original que se quiere duplicar
      const versionOriginal = await this.prisma.vi_version_publicacion.findUnique({
        where: { id: id_version },
        include: {
          vi_publicacion_x_categoria: true,  
          vi_publicacion_x_etiqueta: true,   
          vi_imagen_version: true             
        },
      });
  
      if (!versionOriginal) {
        return {
          status: 'Error',
          message: 'La versión especificada no existe.',
          result: [],
        }
      };

      const estadoBorrador = await this.prisma.vi_estado_version.findFirst({
        where: { nombre: 'Borrador' }
      });
  
      const nuevaVersion = await this.prisma.vi_version_publicacion.create({
        data: {
          id_publicacion: id_publicacion,
          id_estado: estadoBorrador.id,
          titulo: versionOriginal.titulo,
          urlimagen: versionOriginal.urlimagen,
          descripcion: versionOriginal.descripcion,
          slug: versionOriginal.slug,
          richtext: versionOriginal.richtext,
          fechacreacion: new Date(),
          fechaultimamodificacion: new Date(),
          estaactivo: versionOriginal.estaactivo,
        },
      });
  
      // Duplicar las categorías relacionadas
      for (const categoria of versionOriginal.vi_publicacion_x_categoria) {
        await this.prisma.vi_publicacion_x_categoria.create({
          data: {
            id_version: nuevaVersion.id,
            id_categoria: categoria.id_categoria,
          },
        });
      }
  
      // Duplicar las etiquetas relacionadas
      for (const etiqueta of versionOriginal.vi_publicacion_x_etiqueta) {
        await this.prisma.vi_publicacion_x_etiqueta.create({
          data: {
            id_version: nuevaVersion.id,
            id_etiqueta: etiqueta.id_etiqueta,
          },
        });
      }
  
      // Duplicar las imágenes relacionadas
      for (const imagen of versionOriginal.vi_imagen_version) {
        await this.prisma.vi_imagen_version.create({
          data: {
            id_version: nuevaVersion.id,
            urlimagen: imagen.urlimagen,
            descripcion: imagen.descripcion,
            fechacreacion: new Date(),
          },
        });
      }
  
      return {
        status: 'Success',
        message: 'Versión duplicada correctamente',
        result: nuevaVersion,
      };
    } catch (error) {
      console.error('Error al duplicar la versión:', error);
      return {
        status: 'Error',
        message: 'Error al duplicar la versión.',
        result: [],
      };
    }
  }
  
  async deleteVersion(id: number): Promise<any> {
    try {
      const versionActualizada = await this.prisma.vi_version_publicacion.update({
        where: {
          id: id,
        },
        data: {
          estaactivo: false,
        },
      });
  
      return {
        status: 'Success',
        message: 'Versión desactivada correctamente',
        result: versionActualizada,
      };
    } catch (error) {
      console.error('Error al desactivar la versión:', error);
      throw error;
    }
  }
  
  async deletePublicacion(id: number): Promise<any> {
    try {
      // Desactivar la publicación
      const publicacionActualizada = await this.prisma.vi_publicacion.update({
        where: {
          id: id,
        },
        data: {
          estaactivo: false,
        },
      });
  
      // Desactivar todas las versiones asociadas a la publicación
      await this.prisma.vi_version_publicacion.updateMany({
        where: {
          id_publicacion: id,
        },
        data: {
          estaactivo: false,
        },
      });
  
      return {
        status: 'Success',
        message: 'Publicación y versiones desactivadas correctamente',
        result: publicacionActualizada,
      };
    } catch (error) {
      console.error('Error al desactivar la publicación y sus versiones:', error);
      throw error;
    }
  }

  async getPublicacionBySlug(slug: string): Promise<any> {
    try {
      const estadoPublicado = await this.prisma.vi_estado_version.findFirst({
        where: { nombre: 'Publicacion activa' },
      });
  
      if (!estadoPublicado) {
        throw new Error('Estado "Publicacion activa" no encontrado');
      }
  
      const versionPublicada = await this.prisma.vi_version_publicacion.findFirst({
        where: {
          slug: slug,
          id_estado: estadoPublicado.id,
          estaactivo: true,  // Solo versiones activas
        },
        select: {
          id: true,
          titulo: true,
          descripcion: true,
          fechacreacion: true,
          fechaultimamodificacion: true,
          richtext: true,
          vi_estado_version: {
            select: {
              nombre: true,  // Nombre del estado
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
          vi_publicacion_x_categoria: {
            select: {
              vi_categoria_publicacion: {
                select: {
                  id: true,
                  nombre: true,
                  descripcion: true,
                  colorfondo: true,
                  colortexto: true,
                  estaactivo: true,
                },
              },
            },
          },
          vi_publicacion_x_etiqueta: {
            select: {
              vi_etiqueta_publicacion: {
                select: {
                  id: true,
                  nombre: true,
                  descripcion: true,
                  colorfondo: true,
                  colortexto: true,
                  estaactivo: true,
                },
              },
            },
          },
        },
      });
  
      if (!versionPublicada) {
        return {
          status: 'Error',
          message: 'No se encontró una versión publicada para el slug especificado',
          result: null,
        };
      }
  
      // Reestructuramos el resultado para simplificar el formato de categorías y etiquetas
      return {
        status: 'Success',
        message: 'Versión publicada encontrada',
        result: {
          id: versionPublicada.id,
          titulo: versionPublicada.titulo,
          descripcion: versionPublicada.descripcion,
          fechacreacion: versionPublicada.fechacreacion,
          fechaultimamodificacion: versionPublicada.fechaultimamodificacion,
          richtext: versionPublicada.richtext,
          estado: versionPublicada.vi_estado_version.nombre,
          imagenes: versionPublicada.vi_imagen_version,
          categorias: versionPublicada.vi_publicacion_x_categoria.map((item) => item.vi_categoria_publicacion),
          etiquetas: versionPublicada.vi_publicacion_x_etiqueta.map((item) => item.vi_etiqueta_publicacion),
        },
      };
    } catch (error) {
      console.error('Error al obtener la versión publicada por slug:', error);
      return {
        status: 'Error',
        message: 'Error al obtener la versión publicada',
        result: null,
      };
    }
  }
  
  async getFirstsActivePublicaciones(numero: number): Promise<any> {
    try {
      const estadoPublicado = await this.prisma.vi_estado_version.findFirst({
        where: { nombre: 'Publicacion activa' },
      });
  
      if (!estadoPublicado) {
        throw new Error('Estado "Publicacion activa" no encontrado');
      }
  
      const versionesPublicadas = await this.prisma.vi_version_publicacion.findMany({
        where: {
          id_estado: estadoPublicado.id, 
          estaactivo: true, 
        },
        orderBy: {
          fechaultimamodificacion: 'desc', 
        },
        take: numero,
        include: {
          vi_imagen_version: {
            select: {
              id: true,
              urlimagen: true,
              descripcion: true,
              fechacreacion: true,
            },
          },
          vi_publicacion_x_categoria: {
            select: {
              vi_categoria_publicacion: {
                select: {
                  id: true,
                  nombre: true,
                  descripcion: true,
                  colorfondo: true,
                  colortexto: true,
                  estaactivo: true,
                },
              },
            },
          },
          vi_publicacion_x_etiqueta: {
            select: {
              vi_etiqueta_publicacion: {
                select: {
                  id: true,
                  nombre: true,
                  descripcion: true,
                  colorfondo: true,
                  colortexto: true,
                  estaactivo: true,
                },
              },
            },
          },
        },
      });
  
      // Estructurar la respuesta para simplificar las categorías y etiquetas
      const resultado = versionesPublicadas.map(version => ({
        id: version.id,
        id_publicacion: version.id_publicacion,
        id_estado: version.id_estado,
        titulo: version.titulo,
        urlimagen: version.urlimagen,
        descripcion: version.descripcion,
        slug: version.slug,
        richtext: version.richtext,
        fechacreacion: version.fechacreacion,
        fechaultimamodificacion: version.fechaultimamodificacion,
        estaactivo: version.estaactivo,
        imagenes: version.vi_imagen_version,
        categorias: version.vi_publicacion_x_categoria.map(categoria => categoria.vi_categoria_publicacion),
        etiquetas: version.vi_publicacion_x_etiqueta.map(etiqueta => etiqueta.vi_etiqueta_publicacion),
      }));
  
      return {
        status: 'Success',
        message: `Primeras ${numero} versiones con estado Publicacion activa`,
        result: resultado,
      };
    } catch (error) {
      console.error('Error al obtener las versiones activas:', error);
      return {
        status: 'Error',
        message: 'Error al obtener las versiones activas',
        result: null,
      };
    }
  }
  

  async getVersionesActivas(): Promise<any> {
    try {
      const estadoPublicado = await this.prisma.vi_estado_version.findFirst({
        where: { nombre: 'Publicacion activa' },
      });
  
      if (!estadoPublicado) {
        throw new Error('Estado "Publicacion activa" no encontrado');
      }
  
      const versionesPublicadas = await this.prisma.vi_version_publicacion.findMany({
        where: {
          id_estado: estadoPublicado.id, 
          estaactivo: true, 
        },
        orderBy: {
          fechaultimamodificacion: 'desc', 
        },
        include: {
          vi_imagen_version: {
            select: {
              id: true,
              urlimagen: true,
              descripcion: true,
              fechacreacion: true,
            },
          },
          vi_publicacion_x_categoria: {
            select: {
              vi_categoria_publicacion: {
                select: {
                  id: true,
                  nombre: true,
                  descripcion: true,
                  colorfondo: true,
                  colortexto: true,
                  estaactivo: true,
                },
              },
            },
          },
          vi_publicacion_x_etiqueta: {
            select: {
              vi_etiqueta_publicacion: {
                select: {
                  id: true,
                  nombre: true,
                  descripcion: true,
                  colorfondo: true,
                  colortexto: true,
                  estaactivo: true,
                },
              },
            },
          },
        },
      });
  
      // Estructurar la respuesta para simplificar las categorías y etiquetas
      const resultado = versionesPublicadas.map(version => ({
        id: version.id,
        id_publicacion: version.id_publicacion,
        id_estado: version.id_estado,
        titulo: version.titulo,
        urlimagen: version.urlimagen,
        descripcion: version.descripcion,
        slug: version.slug,
        richtext: version.richtext,
        fechacreacion: version.fechacreacion,
        fechaultimamodificacion: version.fechaultimamodificacion,
        estaactivo: version.estaactivo,
        imagenes: version.vi_imagen_version,
        categorias: version.vi_publicacion_x_categoria.map(categoria => categoria.vi_categoria_publicacion),
        etiquetas: version.vi_publicacion_x_etiqueta.map(etiqueta => etiqueta.vi_etiqueta_publicacion),
      }));
  
      return {
        status: 'Success',
        message: `Versiones con estado Publicacion activa obtenidas exitosamente`,
        result: resultado,
      };
    } catch (error) {
      console.error('Error al obtener las versiones activas:', error);
      return {
        status: 'Error',
        message: 'Error al obtener las versiones activas',
        result: null,
      };
    }
  }



  async updatePublicacion(id_version: number, data: PublicacionDto): Promise<any> {
    try {
      // Actualizar los datos principales de la versión
      const pubActualizada = await this.prisma.vi_publicacion.update({
        where: { id: id_version },
        data: {
          nombrereferencia: data.nombrereferencia,
          id_tipo_publicacion: data.id_tipopublicacion,
          descripcion: data.descripcion,
          fechamodificacion: new Date()
        },
      });
    
    return pubActualizada;

    } catch (error) {
      console.error('Error al actualizar la publicacion:', error);
      throw error;
    }
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
