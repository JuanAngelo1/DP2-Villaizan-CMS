import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, BadRequestException,Req,Res, ParseIntPipe } from '@nestjs/common';
import { PuntosVentaService } from './puntos-venta.service';
import { Request, Response } from 'express';
import { vi_puntosventa } from '@prisma/client';
import { PuntosDto } from './dto/puntos.dto';

@Controller('puntosventa')
export class PuntosVentaController {

    constructor (private readonly puntoVentaService: PuntosVentaService) {}

    @Get()
    async getPuntosVenta(@Req () request: Request, @Res() response: Response): Promise<any> {
        try{
            const result= await this.puntoVentaService.getAllPuntos();
            return response.status(200).json({
                status:"Success",
                message: "Puntos de venta encontrados",
                result:result
            })
        }catch(err){
            return response.status(500).json({
                status:"Error",
                message: "Error al obtener los puntos de venta",
                result:[]
            
            })   
        }
    }

    @Post("crear")
    async createPuntoVenta(@Body() data: PuntosDto, @Res() response: Response): Promise<any> {
        try {
            const result = await this.puntoVentaService.createPunto(data);
            return response.status(200).json({
                status: "Success",
                message: "Punto de venta creado exitosamente",
                result: result,
            });
            
        } catch (err) {
            return response.status(500).json({
                status: "Error",
                message: "Error al crear el punto de venta",
                result: [],
            });
        }
    }

    @Put('actualizar/:id')
    async updatePuntoVenta(@Param('id',ParseIntPipe) id: number, @Body() data: PuntosDto, @Res() response: Response): Promise<any> {
        try {
            const result = await this.puntoVentaService.updatePunto(id, data);
            return response.status(200).json({
                status: "Success",
                message: "Puntos de venta actualizado exitosamente",
                result: result
            });
        } catch (error) {
            return response.status(404).json({
                status: "Error",
                message: "Punto de Venta no existe",
                result: []
            });
        }
    }

    @Put('eliminar/:id')  
    async softDeleteComentario(@Param('id',ParseIntPipe) id: number, @Res() response: Response): Promise<any> {
        try {
            const comentarioDeleted = await this.puntoVentaService.deletePunto(id);
            return response.status(200).json({
                status: "Success",
                message: "Punto de venta eliminado exitosamente",
            });
        } catch (error) {
            return response.status(404).json({
                status: "Error",
                message: "Punto de venta no existe",
                result: []
            });
        }
    }

}
