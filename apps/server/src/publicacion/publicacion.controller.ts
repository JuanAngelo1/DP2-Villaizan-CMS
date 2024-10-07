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
} from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { vi_publicacion } from '@prisma/client';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePublicacionDto } from './dto/pub.dto';

@Controller('publicaciones')
export class PublicacionController {
  constructor(private readonly publicacionService: PublicacionService) {}

  //Metodos APIs

  @Get()
  async getAllPubs(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.publicacionService.getAllPublicaciones();
      return response.status(200).json({
        status: 'Success',
        message: 'Publicaciones Encontradas',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Error!',
        message: 'Internal Server Error',
        result: [],
      });
    }
  }

  @Post()
  async createPublicacion(@Body() data: CreatePublicacionDto) {
    try {
      const result = await this.publicacionService.createPublicacion(data);
      return {
        status: 'Success',
        message: 'Publicación creada exitosamente',
        result: result,
      };
    } catch (err) {
      console.error(err);
      return {
        status: 'Error!',
        message: 'Internal Server Error',
        result: [],
      };
    }
  }

  @Get(':id')
  async getPublicacionByID(@Param('id') id: number) {
    const publicacionFound =
      await this.publicacionService.getPublicacionByID(id);
    if (!publicacionFound)
      throw new BadRequestException('Publicación no existe');
    return publicacionFound;
  }

  @Get('recien_editados/:numero')
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

  @Delete(':id')
  async deletePublicacionByID(@Param('id') id: number) {
    try {
      return await this.publicacionService.deletePublicacion(id);
    } catch (error) {
      throw new NotFoundException('Publicacion no existe');
    }
  }

  @Put(':id')
  async updatePublicacion(
    @Param('id') id: number,
    @Body() data: vi_publicacion,
  ) {
    try {
      return this.publicacionService.updatePublicacion(id, data);
    } catch (error) {
      throw new NotFoundException('Publicacion no existe');
    }
  }
}
