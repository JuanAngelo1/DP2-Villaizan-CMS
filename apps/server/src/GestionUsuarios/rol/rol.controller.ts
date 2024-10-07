import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, BadRequestException,Req,Res } from '@nestjs/common'
import { RolService } from './rol.service';
import { vi_rol } from '@prisma/client';
import { Request, Response } from 'express';


@Controller('rol')
export class RolController {

    constructor (private readonly rolService: RolService) {}

    @Get('obtenerTodos')
    async getAllRols(@Req () request: Request, @Res() response: Response): Promise<any> {
        try{
            const result= await this.rolService.getAllRols();
            return response.status(200).json({
                status:"Success",
                message: "Roles encontrados",
                result:result
            })
        }catch(err){
            return response.status(500).json({
                status:"Error",
                message: "Internal Server Error",
                result:[]
            
            })   
        }
    }

    @Post('crearRol')
    async createRol(@Body() data: vi_rol, @Res() response: Response): Promise<any> {
        try {
            const existingRol = await this.rolService.findByNombre(data.nombre);
            if (existingRol) {
                return response.status(400).json({
                    status: "Error",
                    message: "Este rol ya existe",
                    result: [],
                });
            }
    
            const result = await this.rolService.createRol(data.nombre);
            return response.status(201).json({
                status: "Success",
                message: "Rol creado exitosamente",
                result: result,
            });
        } catch (err) {
            return response.status(500).json({
                status: "Error",
                message: "Error al crear el rol",
                result: [],
            });
        }
    }

    @Get('rolxId/:id')
    async getRolByID(@Param('id') id: string, @Res() response: Response): Promise<any> {
        const rolfound = await this.rolService.getRolByID(id);
        if (!rolfound) {
            return response.status(400).json({
                status: "Error",
                message: "Rol no existe",
                result: []
            });
        }
        return response.status(200).json({
            status: "Success",
            message: "Rol encontrado",
            result: rolfound
        });
    }

    
    @Get('rolxNombre/:nombre')
    async getrolByName(@Param('nombre') nombre: string, @Res() response: Response): Promise<any> {
        const rolfound = await this.rolService.getRolByName(nombre);
        if (!rolfound) {
            return response.status(400).json({
                status: "Error",
                message: "Rol no existe",
                result: []
            });
        }
        return response.status(200).json({
            status: "Success",
            message: "Rol encontrado",
            result: rolfound
        });
    }

    @Delete('eliminarRol/:id')
    async deleteRolByID(@Param('id') id: string, @Res() response: Response): Promise<any> {
        try {
            const rolDeleted = await this.rolService.deleteRol(id);
            return response.status(200).json({
                status: "Success",
                message: "Rol eliminado exitosamente",
                result: rolDeleted
            });
        } catch (error) {
            return response.status(404).json({
                status: "Error",
                message: "Rol no existe",
                result: []
            });
        }
    }

    

}
