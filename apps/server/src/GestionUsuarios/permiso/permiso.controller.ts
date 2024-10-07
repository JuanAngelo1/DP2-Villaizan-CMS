import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, BadRequestException,Req,Res } from '@nestjs/common'
import { PermisoService } from './permiso.service';
import { Request, Response } from 'express';
import { vi_permiso } from '@prisma/client';

@Controller('permiso')
export class PermisoController {

    constructor (private readonly permisoService: PermisoService) {}

    @Get('obtenerTodos')
    async getAllRols(@Req () request: Request, @Res() response: Response): Promise<any> {
        try{
            const result= await this.permisoService.getAllPermision();
            return response.status(200).json({
                status:"Success",
                message: "Permisos encontrados",
                result:result
            })
        }catch(err){
            return response.status(500).json({
                status:"Error",
                message: "Error al obtener permisos",
                result:[]
            
            })   
        }
    }

      
    @Post('asignarPermisoRol')
    async assignPermisoToRol(@Body() data: { rolId: string; permisoId: string }, @Res() response: Response): Promise<any> {
        try{
            const result= await this.permisoService.assignPermisoToRol(data.rolId, data.permisoId);
            return response.status(200).json({
                status:"Success",
                message: "Permiso asignado exitosamente",
                result:result
            })
        }catch(err){
            return response.status(500).json({
                status:"Error",
                message: "Error al asignar permiso",
                result:[]
            
            })   
        }
    }

    @Post('crearPermiso')
    async createRol(@Body() data: vi_permiso, @Res() response: Response): Promise<any> {
        try {
            const existingRol = await this.permisoService.findByNombre(data.nombre);
            if (existingRol) {
                return response.status(400).json({
                    status: "Error",
                    message: "Este permiso ya existe",
                    result: [],
                });
            }
    
            const result = await this.permisoService.createPermission(data.nombre);
            return response.status(201).json({
                status: "Success",
                message: "Permiso creado exitosamente",
                result: result,
            });
        } catch (err) {
            return response.status(500).json({
                status: "Error",
                message: "Error al crear el permiso",
                result: [],
            });
        }
    }

    @Get('permisoxId/:id')
    async getRolByID(@Param('id') id: string, @Res() response: Response): Promise<any> {
        const perfound = await this.permisoService.getPermissionByID(id);
        if (!perfound) {
            return response.status(400).json({
                status: "Error",
                message: "Permiso no existe",
                result: []
            });
        }
        return response.status(200).json({
            status: "Success",
            message: "Permiso encontrado",
            result: perfound
        });
    }

    
    @Get('permisoxNombre/:nombre')
    async getrolByName(@Param('nombre') nombre: string, @Res() response: Response): Promise<any> {
        const perfound = await this.permisoService.getPermissionByName(nombre);
        if (!perfound) {
            return response.status(400).json({
                status: "Error",
                message: "Permiso no existe",
                result: []
            });
        }
        return response.status(200).json({
            status: "Success",
            message: "Permiso encontrado",
            result: perfound
        });
    }

    @Delete('eliminarPermiso/:id')
    async deleteRolByID(@Param('id') id: string, @Res() response: Response): Promise<any> {
        try {
            const perDeleted = await this.permisoService.deleteRol(id);
            return response.status(200).json({
                status: "Success",
                message: "Permiso eliminado exitosamente",
                result: perDeleted
            });
        } catch (error) {
            return response.status(404).json({
                status: "Error",
                message: "Permiso no existe",
                result: []
            });
        }
    }
}
