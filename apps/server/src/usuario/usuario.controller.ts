import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, BadRequestException,Req,Res } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { vi_usuario } from "@prisma/client"
import { Request, Response } from 'express';

@Controller('usuario')
export class UsuarioController {

    constructor (private readonly usuarioService: UsuarioService) {}

    @Get()
    async getAllUsuarios(@Req () request: Request, @Res() response: Response): Promise<any> {
        try{
            const result= await this.usuarioService.getAllUsers();
            return response.status(200).json({
                status:"Ok!",
                message: "Usuarios encontrados",
                result:result
            })
        }catch(err){
            return response.status(500).json({
                status:"Error!",
                message: "Internal Server Error",
                result:[]
            
            })
            
        }

    }
       
    @Post()
    async createUsuario(@Body() data: vi_usuario, @Res() response: Response): Promise<any> {
        try {
            const result = await this.usuarioService.createUsuario(data);
            return response.status(201).json({
                status: "Ok!",
                message: "Usuario creado exitosamente",
                result: result,
            });
        } catch (err) {
            return response.status(500).json({
                status: "Error!",
                message: "Error al crear el usuario",
                result: [],
            });
        }
    }

    @Get(':id')
    async getUsuarioByID(@Param('id') id: string) {
        const usuarioFound= await this.usuarioService.getUsuarioByID(id);
        if(!usuarioFound)throw new BadRequestException("Usuario no existe")
        return usuarioFound;
    }

    @Delete(':id')
    async deleteUsuarioByID(@Param('id') id: string) {
        try{
            return await this.usuarioService.deleteUsuario(id);
        }catch(error){
            throw new NotFoundException("Usuario no existe")
        }
        
    }

    @Put(':id')
    async updateUsuario(@Param('id') id: string, @Body() data: vi_usuario) {
        try{
            return this.usuarioService.updateUsuario(id,data);
        }catch(error){
            throw new NotFoundException("Usuario no existe")
        }
    }
}
