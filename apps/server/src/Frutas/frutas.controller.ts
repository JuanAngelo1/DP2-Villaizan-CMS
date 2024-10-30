import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Res,
    Param,
    Req,
    NotFoundException,
    ParseIntPipe,
} from '@nestjs/common';
import { FrutasService } from './frutas.service';
import { Response } from 'express';

@Controller('frutas')
export class FrutasController {

    constructor(private readonly frutasService: FrutasService) {}

    @Get()
    async getFAQS(
      @Req() request: Request,
      @Res() response: Response,
    ): Promise<any> {
      try {
        const result = await this.frutasService.getAllFrutas();
        return response.status(200).json({
          status: 'Success',
          message: 'Frutas encontrados',
          result: result,
        });
      } catch (err) {
        return response.status(500).json({
          status: 'Error',
          message: 'Error al obtener las Frutas',
          result: [],
        });
      }
    }

}
