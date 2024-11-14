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
  } from '@nestjs/common';
import { SentimientosService } from './sentimientos.service';
import { Request, Response } from 'express';
import { vi_sentimiento } from '@prisma/client';

@Controller('sentimientos')
export class SentimientosController {

    constructor(private readonly sentimientoService: SentimientosService) {}

    @Get()
    async getAllComentarios(
      @Req() request: Request,
      @Res() response: Response,
    ): Promise<any> {
      try {
        const result = await this.sentimientoService.getAllSentimientos();
        return response.status(200).json({
          status: 'Success',
          message: 'Sentimientos encontrados',
          result: result,
        });
      } catch (err) {
        return response.status(500).json({
          status: 'Error',
          message: 'Error al obtener los sentimientos',
          result: [],
        });
      }
    }
}
