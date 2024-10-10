import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, BadRequestException,Req,Res } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { vi_usuario } from "@prisma/client"
import { Request, Response } from 'express';
import { CreateUsuarioDto } from './dto/usuario.dto';

@Controller('usuario')
export class UsuarioController {

    constructor (private readonly usuarioService: UsuarioService) {}

    @Get('obtenerTodos')
    async getAllUsuarios(@Req () request: Request, @Res() response: Response): Promise<any> {
        try{
            const result= await this.usuarioService.getAllUsers();
            return response.status(200).json({
                status:"Success",
                message: "Usuarios encontrados",
                result:result
            })
        }catch(err){
            return response.status(500).json({
                status:"Error",
                message: "Error al obtener los usuarios",
                result:[]
            
            })   
        }
    }
       
    @Post()
    async createUsuario(@Body() data: CreateUsuarioDto, @Res() response: Response): Promise<any> {
        try {
            const existingUser = await this.usuarioService.findByEmail(data.correo);
            if (existingUser) {
                return response.status(400).json({
                    status: "Error",
                    message: "Este correo ya tiene una cuenta asociada",
                    result: [],
                });
            }
    
            const result = await this.usuarioService.createUsuario(data);
            return response.status(201).json({
                status: "Success",
                message: "Usuario creado exitosamente",
                result: result,
            });
        } catch (err) {
            return response.status(500).json({
                status: "Error",
                message: "Error al crear el usuario",
                result: [],
            });
        }
    }

    @Get(':id')
    async getUsuarioByID(@Param('id') id: string, @Res() response: Response): Promise<any> {
        const usuarioFound = await this.usuarioService.getUsuarioByID(id);
        if (!usuarioFound) {
            return response.status(400).json({
                status: "Error",
                message: "Usuario no existe",
                result: []
            });
        }
        return response.status(200).json({
            status: "Success",
            message: "Usuario encontrado",
            result: usuarioFound
        });
    }

    @Delete('eliminarUsuario/:id')
    async deleteUsuarioByID(@Param('id') id: string, @Res() response: Response): Promise<any> {
        try {
            const usuarioDeleted = await this.usuarioService.deleteUsuario(id);
            return response.status(200).json({
                status: "Success",
                message: "Usuario eliminado exitosamente",
                result: usuarioDeleted
            });
        } catch (error) {
            return response.status(404).json({
                status: "Error",
                message: "Usuario no existe",
                result: []
            });
        }
    }

    @Put('actualizarUsuario/:id')
    async updateUsuario(@Param('id') id: string, @Body() data: vi_usuario, @Res() response: Response): Promise<any> {
        try {
            const usuarioUpdated = await this.usuarioService.updateUsuario(id, data);
            return response.status(200).json({
                status: "Success",
                message: "Usuario actualizado exitosamente",
                result: usuarioUpdated
            });
        } catch (error) {
            return response.status(404).json({
                status: "Error",
                message: "Usuario no existe",
                result: []
            });
        }
    }
}
