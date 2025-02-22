import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  Req,
  Res,
  Patch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { vi_usuario } from '@prisma/client';
import { Request, response, Response } from 'express';
import { UsuarioDto } from './dto/usuario.dto';
import { GoogleUserDto } from './dto/google-user.dto';
import { PersonaUpdateDTO } from './dto/persona.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('')
  async getAllUsuarios(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.usuarioService.getAllUsuarios();
      return response.status(200).json({
        status: 'Success',
        message: 'Usuarios encontrados',
        result: result,
      });
    } catch (err) {
      console.log(err);
      return response.status(500).json({
        status: 'Error',
        message: 'Error al obtener los usuarios',
        result: [],
      });
    }
  }

  @Post('loginGoogle')
  async verifyCreateGoogleUser(
    @Body() data: GoogleUserDto,
    @Res() response: Response,
  ): Promise<any> {
    console.log(data.email);
    try {
      const existingUser = await this.usuarioService.findByEmailWithRole(
        data.email,
      );
      if (existingUser) {
        return response.status(201).json({
          status: 'Success',
          message: 'Usuario autenticado con Google',
          result: existingUser,
        });
      }

      const result = await this.usuarioService.createUserGoogle(data);
      return response.status(201).json({
        status: 'Success',
        message: 'Usuario creado exitosamente',
        result: result,
      });
    } catch (err) {
      console.log(err);
      return response.status(500).json({
        status: 'Error',
        message: 'Error al crear el usuario',
        result: [],
      });
    }
  }


  @Post()
  async createUsuario(
    @Body() data: UsuarioDto,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const existingUser = await this.usuarioService.findByEmail(data.correo);
      if (existingUser) {
        return response.status(400).json({
          status: 'Error',
          message: 'Este correo ya tiene una cuenta asociada',
          result: [],
        });
      }

      const result = await this.usuarioService.createUsuario(data);
      return response.status(201).json({
        status: 'Success',
        message: 'Usuario creado exitosamente',
        result: result,
      });
    } catch (err) {
      console.log(err);
      return response.status(500).json({
        status: 'Error',
        message: 'Error al crear el usuario',
        result: [],
      });
    }
  }

  

  @Get(':id')
  async getUsuarioByID(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<any> {
    const usuarioFound = await this.usuarioService.getUsuarioByID(id);
    if (!usuarioFound) {
      return response.status(400).json({
        status: 'Error',
        message: 'Usuario no existe',
        result: [],
      });
    }
    return response.status(200).json({
      status: 'Success',
      message: 'Usuario encontrado',
      result: usuarioFound,
    });
  }

  @Delete('/:id')
  async deleteUsuarioByID(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const usuarioDeleted = await this.usuarioService.deleteUsuario(id);
      return response.status(200).json({
        status: 'Success',
        message: 'Usuario eliminado exitosamente',
        result: usuarioDeleted,
      });
    } catch (error) {
      return response.status(404).json({
        status: 'Error',
        message: 'Usuario no existe',
        result: [],
      });
    }
  }

  @Put('actualizarUsuario/:id')
  async updateUsuario(
    @Param('id') id: string,
    @Body() data: vi_usuario,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const usuarioUpdated = await this.usuarioService.updateUsuario(id, data);
      return response.status(200).json({
        status: 'Success',
        message: 'Usuario actualizado exitosamente',
        result: usuarioUpdated,
      });
    } catch (error) {
      return response.status(404).json({
        status: 'Error',
        message: 'Usuario no existe',
        result: [],
      });
    }
  }

  @Put('actualizarPersona/:id')
  async updatePersona(
    @Param('id') id: string,
    @Body() data: PersonaUpdateDTO,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const personaUpdated = await this.usuarioService.updatePersonaInfo(
        id,
        data,
      );
      return response.status(200).json({
        status: 'Success',
        message: 'Persona actualizada exitosamente',
        result: personaUpdated,
      });
    } catch (error) {
      return response.status(404).json({
        status: 'Error',
        message: 'Persona no existe',
        result: [],
      });
    }
  }

  @Patch('/rol/:id')
  async updateRol(
    @Param('id') id_usuario: string,
    @Body('id_rol') id_rol: string,
  ) {
    try {
      const usuarioUpdated = await this.usuarioService.updateRol(
        id_usuario,
        id_rol,
      );
      return {
        status: 'Success',
        message: 'Rol actualizado exitosamente',
        result: usuarioUpdated,
      };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        {
          status: 'Error',
          message: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
