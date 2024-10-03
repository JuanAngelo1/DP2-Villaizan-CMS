import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, BadRequestException,Req,Res } from '@nestjs/common';
import { PublicacionService } from './publicacion.service';
import { vi_publicacion } from "@prisma/client"
import { Request, Response } from 'express';


@Controller('publicacion')
export class PublicacionController {

    constructor (private readonly publicacionService: PublicacionService) {}

    //Metodos APIs

    @Get()
    async getAllPubs(@Req () request: Request, @Res() response: Response): Promise<any> {
        try{
            const result= await this.publicacionService.getAllPublicaciones();
            return response.status(200).json({
                status:"Ok!",
                message: "Publicaciones Encontradas",
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
    async createPublicacion(@Body() data: vi_publicacion) {
        return this.publicacionService.createPublicacion(data);
    }

    @Get(':id')
    async getUsuarioByID(@Param('id') id: number) {
        const publicacionFound= await this.publicacionService.getPublicacionByID(id);
        if(!publicacionFound)throw new BadRequestException("Publicación no existe")
        return publicacionFound;
    }

    @Delete(':id')
    async deleteUsuarioByID(@Param('id') id: number) {
        try{
            return await this.publicacionService.deletePublicacion(id);
        }catch(error){
            throw new NotFoundException("Usuario no existe")
        }
        
    }

    @Put(':id')
    async updateUsuario(@Param('id') id: number, @Body() data: vi_publicacion) {
        try{
            return this.publicacionService.updatePublicacion(id,data);
        }catch(error){
            throw new NotFoundException("Usuario no existe")
        }
    }


}
