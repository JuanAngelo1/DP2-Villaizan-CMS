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
  ParseIntPipe,
  Patch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ComentarioService } from './comentario.service';
import { vi_comentario } from '@prisma/client';
import { Request, Response } from 'express';
import { CreateComentarioDto } from './dto/comentario.dto';

@Controller('comentario')
export class ComentarioController {
  constructor(private readonly comentarioService: ComentarioService) {}

  @Get()
  async getAllComentarios(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.comentarioService.getAllComentarios();
      return response.status(200).json({
        status: 'Success',
        message: 'Comentarios encontrados',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Error',
        message: 'Error al obtener los comentarios',
        result: [],
      });
    }
  }

  @Post()
  async createComentario(
    @Body() data: CreateComentarioDto,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.comentarioService.createComentario(data);
      return response.status(200).json({
        status: 'Success',
        message: 'Comentario creado exitosamente',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Error',
        message: 'Error al crear el comentario',
        result: err,
      });
    }
  }

  @Get(':id')
  async getComentarioByID(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ): Promise<any> {
    const comentariFound = await this.comentarioService.getComentarioById(id);
    if (!comentariFound) {
      return response.status(400).json({
        status: 'Error',
        message: 'Comentario no existe',
        result: [],
      });
    }
    return response.status(200).json({
      status: 'Success',
      message: 'Comentario encontrado',
      result: comentariFound,
    });
  }

  @Put(':id')
  async updateComentarioo(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: vi_comentario,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const comentarioUpdate = await this.comentarioService.updateComentario(
        id,
        data,
      );
      return response.status(200).json({
        status: 'Success',
        message: 'Comentario actualizado exitosamente',
        result: comentarioUpdate,
      });
    } catch (error) {
      return response.status(404).json({
        status: 'Error',
        message: 'Comentario no existe',
        result: [],
      });
    }
  }

  @Delete(':id')
  async softDeleteComentario(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const comentarioDeleted =
        await this.comentarioService.softDeleteComentario(id);
      return response.status(200).json({
        status: 'Success',
        message: 'Comentario eliminado exitosamente',
        result: comentarioDeleted,
      });
    } catch (error) {
      return response.status(404).json({
        status: 'Error',
        message: 'Comentario no existe',
        result: [],
      });
    }
  }

  @Get('obtenerPublicacion/:id')
  async getComentariosPublicacion(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ): Promise<any> {
    const comentariFound =
      await this.comentarioService.getComentariosByPublicacion(id);
    if (!comentariFound) {
      return response.status(400).json({
        status: 'Error',
        message: 'Comentario no existe',
        result: [],
      });
    }
    return response.status(200).json({
      status: 'Success',
      message: 'Comentarios encontrados',
      result: comentariFound,
    });
  }

  @Patch('/sentimiento/:id')
  async updateRol(
    @Param('id', ParseIntPipe) id_comentario: number,
    @Body('id_sentimiento', ParseIntPipe) id_sentimiento: number,
  ) {
    try {
      const id_comentario_updated =
        await this.comentarioService.updateSentimiento(
          id_comentario,
          id_sentimiento,
        );
      return {
        status: 'Success',
        message: 'Sentimiento actualizado',
        result: id_comentario_updated,
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        {
          status: 'Error',
          message: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('contarEntreFechas')
  async contarComentariosEntreFechas(
    @Body() data: { fechaInicio: string; fechaFin: string },
  ): Promise<any> {
    try {
      console.log(data);
      const result = await this.comentarioService.countComentariosBetweenDates(
        new Date(data.fechaInicio),
        new Date(data.fechaFin),
      );
      console.log(result); // Imprimiría el número de comentarios en ese rango de fechas.
      return {
        status: 'Success',
        message: 'Comentarios',
        result: result,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          status: 'Error',
          message: 'Error al obtener los comentarios',
          result: [],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('listarEntreFechas/:fechaInicio/:fechaFin')
  async listarComentariosEntreFechas(
    @Param('fechaInicio') fechaInicio: string,
    @Param('fechaFin') fechaFin: string,
  ): Promise<any> {
    try {
      const result = await this.comentarioService.countComentariosBetweenDates(
        new Date(fechaInicio),
        new Date(fechaFin),
      );
      return {
        status: 'Success',
        message: 'Comentarios obtenidos entre fechas',
        result: result,
      };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          status: 'Error',
          message: 'Error al obtener los comentarios',
          result: [],
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
