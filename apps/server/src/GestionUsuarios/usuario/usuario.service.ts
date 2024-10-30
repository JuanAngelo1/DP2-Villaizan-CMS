import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { vi_usuario } from '@prisma/client';
import { UsuarioDto } from './dto/usuario.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UsuarioRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {
  constructor(
    private prisma: PrismaService,
    private usuarioRepository: UsuarioRepository,
  ) {}

  async getAllUsuarios(): Promise<vi_usuario[]> {
    return this.usuarioRepository.findAll();
  }

  async getUsuarioByID(id: string): Promise<vi_usuario> {
    return this.prisma.vi_usuario.findUnique({
      where: {
        id,
      },
    });
  }

  async createUsuario(data: UsuarioDto): Promise<vi_usuario> {
    const generatedId = `us-${uuidv4().split('-')[0]}`;
    const generatedPersonaId = `per-${uuidv4().split('-')[0]}`;
    const hashedPassword = await bcrypt.hash(data.contrasena, 10);

    await this.prisma.vi_persona.create({
      data: {
        id: generatedPersonaId,
        estado: 'activo',
        usuariocreacion: '2A',
      },
    });

    let rol;
    if (data.nombreRol) {
      rol = await this.prisma.vi_rol.findFirst({
        where: {
          nombre: data.nombreRol,
        },
      });
    } else {
      rol = await this.prisma.vi_rol.findFirst({
        where: {
          nombre: 'Cliente',
        },
      });
    }

    return this.prisma.vi_usuario.create({
      data: {
        id: generatedId,
        nombre: data.nombre,
        apellido: data.apellido,
        concuenta: true,
        numerotelefono: data.numerotelefono,
        correo: data.correo,
        contrasena: hashedPassword,
        id_persona: generatedPersonaId,
        usuariocreacion: '2A',
        id_rol: rol.id,
      },
    });
  }

  async updateUsuario(id: string, data: vi_usuario): Promise<vi_usuario> {
    return this.prisma.vi_usuario.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUsuario(id: string): Promise<void> {
    try {
      return this.usuarioRepository.deleteById(id);
    } catch (error) {
      throw new InternalServerErrorException('Error al borrar usuario');
    }
  }

  async findByEmail(correo: string): Promise<vi_usuario | null> {
    return this.prisma.vi_usuario.findUnique({
      where: {
        correo,
      },
    });
  }

  async updateRol(usuarioId: string, newRoleId: string): Promise<vi_usuario> {
    try {
      return this.usuarioRepository.updateRole(usuarioId, newRoleId);
    } catch (error) {
      throw new InternalServerErrorException('Error al listar etiquetas');
    }
  }
}
