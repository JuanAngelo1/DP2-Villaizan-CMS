import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Res,
  Param,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { Response } from 'express';
import { CategoriaDto } from './dto/categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}
  @Get()
  async getAllPubs(@Res() response: Response): Promise<any> {
    try {
      const result = await this.categoriaService.getAllCategorias();
      return response.status(200).json({
        status: 'Success',
        message: 'Categorias Encontradas',
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
  async createCategoria(@Body() data: CategoriaDto) {
    try {
      const result = await this.categoriaService.createCategoria(data);
      return {
        status: 'Success',
        message: 'Categoria creada exitosamente',
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

  @Put(':id')
  async updateCategoria(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CategoriaDto,
  ) {
    try {
      return this.categoriaService.updateCategoria(id, data);
    } catch (error) {
      throw new NotFoundException('Usuario no existe');
    }
  }

  @Delete(':id')
  async deleteCategoriaByID(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.categoriaService.deleteCategoria(id);
    } catch (error) {
      throw new NotFoundException('Categoria no existe');
    }
  }
}
