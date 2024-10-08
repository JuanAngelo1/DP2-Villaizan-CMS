import {
  Body,
  Controller,
  Delete,
  Get,
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

  @Get()
  async getAllEtiquetas(@Res() response: Response): Promise<any> {
    try {
      const result = await this.etiquetaService.getAllEtiquetas();
      return response.status(200).json({
        status: 'Success',
        message: 'Etiquetas Encontradas',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Error',
        message: 'Internal Server Error',
        result: [],
      });
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
