import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  Req,
  Res,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { vi_publicacion } from '@prisma/client';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { VersionDto } from './dto/pub.dto';
import { PublicacionDto } from './dto/publicacion.dto';
import { UpdateVersionDto } from './dto/update-version.dto';

@Controller('publicaciones')
export class PublicacionController {
  constructor(private readonly publicacionService: PublicacionService) {}

  //Metodos APIs

  @Get()
  async getAllPubs(@Req() request: Request, @Res() response: Response,): Promise<any> {
    try {
      const result = await this.publicacionService.getAllPublicaciones();
      return response.status(200).json({
        status: 'Success',
        message: 'Publicaciones Encontradas',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Error',
        message: 'Error al encontrar las publicaciones',
        result: [],
      });
    }
  }

  @Get(':id')
  async getPublicacionByID(@Param('id',ParseIntPipe) id: number) {
    try{
      const result= await this.publicacionService.getPublicacionByID(id);
      return{
        status: 'Success',
        message: 'Publicación encontrada',
        result: result,
      };
    }catch(err){
      console.error(err);
      return{
        status: 'Error',
        message: 'Error al obtener publicacion por ID',
        result: [],
      };
    }
  }

  @Get('versiones/:id')
  async getVersionesbyID(@Param('id',ParseIntPipe) id: number) {
    try{
      const result= await this.publicacionService.getAllVersiones(id);
      return{
        status: 'Success',
        message: 'Versiones de la publicacion encontradas',
        result: result,
      };
    }catch(err){
      console.error(err);
      return{
        status: 'Error',
        message: 'Error al obtener las versiones de la publicacion',
        result: [],
      };
    }
  }

  @Get('version/:id')
  async getVersionbyID(@Param('id',ParseIntPipe) id: number) {
    try{
      const result= await this.publicacionService.getVersionbyID(id);
      return{
        status: 'Success',
        message: 'Version encontrada',
        result: result,
      };
    }catch(err){
      console.error(err);
      return{
        status: 'Error',
        message: 'Error al obtener la version',
        result: [],
      };
    }
  }

  @Post('crearPublicacion')
  async createPublicacion(@Body() data: PublicacionDto) {
    try {
      const result = await this.publicacionService.createOnlyPublicacion(data);
      return {
        status: 'Success',
        message: 'Publicación creada exitosamente',
        result: result,
      };
    } catch (err) {
      console.error(err);
      return {
        status: 'Error',
        message: 'Error al crear la publicacion',
        result: [],
      };
    }
  }

  @Post('crearVersion')
  async createVersion(@Body() data: VersionDto) {
    try {
      const result = await this.publicacionService.createVersion(data);
      return {
        status: 'Success',
        message: 'Version creada exitosamente',
        result: result,
      };
    } catch (err) {
      console.error(err);
      return {
        status: 'Error',
        message: 'Error al crear la version',
        result: [],
      };
    }
  }

  @Put('actualizarVersion/:id') 
  async updatePublicacion( @Param('id',ParseIntPipe) id: number, @Body() data: UpdateVersionDto) {
    try {
      const result= await this.publicacionService.updateVersion(id, data);
      return {
        status: 'Success',
        message: 'Versión actualizada correctamente',
        result: result,
      };
    } catch (err) {
        console.error(err);
        return {
          status: 'Error',
          message: 'Error al actualizar la version',
          result: [],
        };
      }
  }

  @Put('publicar/:idPub/:idVer')
  async publicarVersion(@Param('idPub',ParseIntPipe) idPub: number, @Param('idVer',ParseIntPipe) idVer: number ){
      return await this.publicacionService.publicarVersion(idPub,idVer);
  }

  @Put('despublicar/:idPub/:idVer')
  async despublicarVersion(@Param('idPub',ParseIntPipe) idPub: number, @Param('idVer',ParseIntPipe) idVer: number ){
      return await this.publicacionService.despublicarVersion(idPub,idVer);
  }

  @Put('archivar/:id')
  async archivarPublicacion(@Param('id', ParseIntPipe) id: number): Promise<any> {
      try {
          const publicacion = await this.publicacionService.archivarPublicacion(id);
          return {
              status: 'Success',
              message: 'Publicacion archivada correctamente',
              result: publicacion,
          };
      } catch (error) {
          return {
              status: 'Error',
              message: 'Error al archivar publicacion',
          };
      }
  }

  @Put('desarchivar/:id')
  async desarchivarPublicacion(@Param('id', ParseIntPipe) id: number): Promise<any> {
      try {
          const publicacion = await this.publicacionService.desarchivarPublicacion(id);
          return {
              status: 'Success',
              message: 'Publicacion desarchivada correctamente',
              result: publicacion,
          };
      } catch (error) {
          return {
              status: 'Error',
              message: 'Error al desarchivada publicacion',
          };
      }
  }


  @Post('duplicar/:idPub/:idVer')
  async duplicarVersion(@Param('idPub',ParseIntPipe) idPub: number, @Param('idVer',ParseIntPipe) idVer: number ){
      return await this.publicacionService.duplicarVersion(idPub,idVer);
  }

  @Get('slug/:slug')
  async getPublicacionBySlug(@Param('slug') slug: string) {
    return await this.publicacionService.getPublicacionBySlug(slug);
  }


  @Get('versionesRecientes')
  async getPublicaciones() {
    try{
      const result= await this.publicacionService.getPublicacionesConVersionesRecientes();
      return{
        status: 'Success',
        message: 'Publicaciones encontradas',
        result: result,
      };
    }catch(err){
      console.error(err);
      return{
        status: 'Error',
        message: 'Error al obtener publicaciones recientes',
        result: [],
      };
    }
  }

  @Get('cantidadComentarios')
  async getPublicacionesCantidadComentarios(@Req() request: Request, @Res() response: Response,): Promise<any> {
    try {
      const result = await this.publicacionService.getPublicacionesCantidadComentarios();
      return response.status(200).json({
        status: 'Success',
        message: 'Publicaciones Encontradas',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Error',
        message: 'Error al obtener la cantidad de comentarios',
        result: [],
      });
    }
  }

  @Get('recienEditados/:numero')
  async getFirstsEdited(@Param('numero') numero: string) {
    const numeroParsed = parseInt(numero);
    if (isNaN(numeroParsed) || numeroParsed <= 0) {
      throw new BadRequestException(
        'El parámetro debe ser un número entero positivo',
      );
    }
    const publicaciones =
      await this.publicacionService.getFirstsEditedPublicacion(numeroParsed);
    if (!publicaciones || publicaciones.length === 0)
      throw new BadRequestException('Publicación no existe');
    return publicaciones;
  }

  @Put('eliminarPublicacion/:id')
  async deletePublicacionByID(@Param('id',ParseIntPipe) id: number) {
    try {
      return await this.publicacionService.deletePublicacion(id);
    } catch (error) {
      throw new NotFoundException('Publicacion no existe');
    }
  }

  @Put('eliminarVersion/:id')
  async deleteVersionByID(@Param('id',ParseIntPipe) id: number) {
    try {
      return await this.publicacionService.deleteVersion(id);
    } catch (error) {
      throw new NotFoundException('Version no existe');
    }
  }

  @Get('estadosPublicacion')
  async listarEstadosPublicacion(): Promise<any> {
      try {
          const estados = await this.publicacionService.listarTodosEstadosPublicacion();
          return {
              status: 'Success',
              message: 'Estados de publicación listados correctamente',
              result: estados,
          };
      } catch (error) {
          return {
              status: 'Error',
              message: 'Error al listar los estados de publicación',
          };
      }
  }

  @Get('tiposPublicacion')
  async listarTiposPublicacion(): Promise<any> {
      try {
          const tipos = await this.publicacionService.listarTodosTiposPublicacion();
          return {
              status: 'Success',
              message: 'Tipos de publicación listados correctamente',
              result: tipos,
          };
      } catch (error) {
          return {
              status: 'Error',
              message: 'Error al listar los tipos de publicación',
          };
      }
  }

}
