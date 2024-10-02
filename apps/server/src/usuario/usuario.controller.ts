import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { vi_usuario } from "@prisma/client"

@Controller('usuario')
export class UsuarioController {

    constructor (private readonly usuarioService: UsuarioService) {}

    @Get()
    async getAllUsuarios() {
        return this.usuarioService.getAllUsers();
    }

    @Post()
    async createUsuario(@Body() data: vi_usuario) {
        return this.usuarioService.createUsuario(data);
    }

    @Get(':id')
    async getUsuarioByID(@Param('id') id: string) {
        return this.usuarioService.getUsuarioByID(id);
    }

    @Delete(':id')
    async deleteUsuarioByID(@Param('id') id: string) {
        try{
            return this.usuarioService.deleteUsuario(id);
        }catch(error){
            throw new NotFoundException("Usuario no existe")
        }
        
    }

    @Put(':id')
    async updateUsuario(@Param('id') id: string, @Body() data: vi_usuario) {
        return this.usuarioService.updateUsuario(id,data);
    }
}
