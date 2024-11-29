import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { VillaparadaService } from './villaparada.service';
import { VillaParadaDTO } from './dto/villaparada.dto';
import { AgregarPuntosDTO } from './dto/agregarpuntos.dto';

@Controller('villaparada')
export class VillaparadaController {
  constructor(private readonly villaparadaService: VillaparadaService) {}
  @Get('')
  async getAllVillaparadas(): Promise<any> {
    try {
      const result = await this.villaparadaService.getAllVillaparadas();
      return {
        return: 'Success',
        message: 'Villaparadas encontradas',
        result: result,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: 'Error',
          message: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createVillaparada(@Body() data: VillaParadaDTO) {
    try {
      const result = await this.villaparadaService.createVillaparada(data);
      return {
        status: 'Success',
        message: 'Villaparada creada exitosamente',
        result: result.id,
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
  async updateVillaparada(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: VillaParadaDTO,
  ) {
    try {
      await this.villaparadaService.updateVillaparada(id, data);
      return {
        status: 'Success',
        message: 'Villaparada actualizada exitosamente',
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

  @Delete(':id')
  async deleteVillaparadaById(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.villaparadaService.deleteVillaparada(id);
      return {
        status: 'Success',
        message: 'Villaparada eliminada exitosamente',
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

  @Post('sumarpuntos')
  async sumarPuntos(@Body() data: AgregarPuntosDTO) {
    try {
      const result = await this.villaparadaService.sumarPuntos(data);

      if (result.success === false) {
        return {
          status: 'Error',
          message: result.message,
        };
      }
      return {
        status: 'Success',
        message: `Se sumaron ${data.puntos} puntos a la villaparada`,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 'Error',
        message: 'Ha ocurrido un error',
        result: [],
      };
    }
  }
}
