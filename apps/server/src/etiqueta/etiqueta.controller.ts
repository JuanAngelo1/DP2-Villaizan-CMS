import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { EtiquetaService } from './etiqueta.service';
import { EtiquetaDto } from './dto/etiqueta.dto';

@Controller('etiqueta')
export class EtiquetaController {
  constructor(private readonly etiquetaService: EtiquetaService) {}

  //Tomar como referencia el siguiente código
  @Get()
  async getAllEtiquetas(): Promise<any> {
    try {
      const result = await this.etiquetaService.getAllEtiquetas();
      return {
        status: 'Success',
        message: 'Etiquetas Encontradas',
        result: result,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: 'Error',
          message: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createEtiqueta(@Body() data: EtiquetaDto) {
    try {
      const result = await this.etiquetaService.createEtiqueta(data);
      return {
        status: 'Success',
        message: 'Etiqueta creada exitosamente',
        result: result,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 'Error',
        message: 'Internal Server Error',
        result: [],
      };
    }
  }

  @Put(':id')
  async updateEtiqueta(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: EtiquetaDto,
  ) {
    try {
      const result = this.etiquetaService.updateEtiqueta(id, data);
      return {
        status: 'Success',
        message: 'Etiqueta actualizada exitosamente',
      };
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Etiqueta no existe');
    }
  }

  @Delete(':id')
  async deleteEtiquetaById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.etiquetaService.deleteEtiqueta(id);
    } catch (error) {
      throw new NotFoundException('Etiqueta no existe');
    }
  }
}
