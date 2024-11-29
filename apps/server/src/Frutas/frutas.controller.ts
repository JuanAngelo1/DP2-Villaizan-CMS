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

  @Get('famosos')
  async getProductos(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.frutasService.getPopularFruits();
      return response.status(200).json({
        status: 'Success',
        message: 'Productos encontrados',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Error',
        message: 'Error al obtener los productos',
        result: [],
      });
    }
  }

  @Get()
  async getFrutas(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.frutasService.getAllFrutasNoUser();
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

  @Get('porUsuario/:id')
  async getAllFrutasByUser(
    @Param('id') id: string,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.frutasService.getAllFrutasByUser(id);

      //map result, if it has 1 or more rows for vi_villaparadas_x_usuario, then mark isUnlocked as true
      const new_result = result.map((fruta) => {

        const new_villaparadas = fruta.vi_villaparada.map((villaparada) => {
          return {
            ...villaparada,
            isUnlocked: villaparada.vi_villaparada_x_usuario.length > 0,
          };
        });

        const new_fruta = {
          ...fruta,
          vi_villaparada: new_villaparadas,
        };

        return new_fruta
      });

      return response.status(200).json({
        status: 'Success',
        message: 'Frutas encontrados',
        result: new_result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Error',
        message: 'Error al obtener las Frutas',
        result: [],
      });
    }
  }

  @Get(':id')
  async getFrutaById(
    @Param('id') id: string,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.frutasService.getFrutaById(id);
      return response.status(200).json({
        status: 'Success',
        message: 'Frutas encontrada',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Error',
        message: 'Error al encontrar fruta con id: ' + id,
        result: [],
      });
    }
  }
}
