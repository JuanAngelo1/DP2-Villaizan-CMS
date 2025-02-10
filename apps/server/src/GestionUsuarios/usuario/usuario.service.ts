import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { vi_usuario } from '@prisma/client';
import { UsuarioDto } from './dto/usuario.dto';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { UsuarioRepository } from './usuario.repository';
import { GoogleUserDto } from './dto/google-user.dto';
import { PersonaUpdateDTO } from './dto/persona.dto';
import axios from 'axios';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsuarioService {
  constructor(
    private prisma: PrismaService,
    private usuarioRepository: UsuarioRepository,
    // private readonly httpService: HttpService, // Inyección de HttpService
  ) {}

  async getAllUsuarios(): Promise<vi_usuario[]> {
    return this.usuarioRepository.findAll();
  }

  async getUsuarioByID(id: string): Promise<vi_usuario> {
    return this.prisma.vi_usuario.findUnique({
      where: {
        id,
      },
      include: {
        vi_rol: true,
        vi_persona: true,
      },
    });
  }

  async verifyGoogleUser(data: GoogleUserDto): Promise<any> {
    const user = await this.prisma.vi_usuario.findFirst({
      where: {
        correo: data.email,
      },
    });

    console.log("Llego aqui?");
    
    if (!user) {
      return this.createUserGoogle(data);
    } else {
      return {
        status: 'Success',
        message: 'Usuario de Google encontrado',
        result: user,
      };
    }
  }

  async createUserGoogle(data: GoogleUserDto): Promise<any> {
    const generatedId = `us-${uuidv4().split('-')[0]}`;
    const generatedPersonaId = `per-${uuidv4().split('-')[0]}`;

    const rol = await this.prisma.vi_rol.findFirst({
      where: {
        nombre: 'Cliente',
      },
    });

    await this.prisma.vi_persona.create({
      data: {
        id: generatedPersonaId,
        estado: 'activo',
        usuariocreacion: '2A',
      },
    });

    if(data.apellido==''){
      data.apellido='-';
      console.log(data.apellido);
    }

    await this.prisma.vi_usuario.create({
      data: {
        id: generatedId,
        nombre: data.nombre,
        apellido: data.apellido,
        concuenta: true,
        correo: data.email,
        imagenperfil: data.imagenperfil,
        contrasena: 'google',
        usuariocreacion: '2A',
        id_crm: '',
        puntosacumulados: 0,
        vi_rol: {
          connect: { id: rol.id },
        },
        vi_persona: {
          connect: { id: generatedPersonaId },
        },
      },
    });

    const new_google_usuario = await this.prisma.vi_usuario.findUnique({
      where: {
        id: generatedId,
      },
      include: {
        vi_rol: true,
        vi_persona: true,
      },
    });

    return new_google_usuario;
  }

  async findByEmailWithRole(email: string): Promise<any> {

    console.log("Email", email);
    // Busca al usuario por su correo e incluye el rol en la consulta
    const usuario = await this.prisma.vi_usuario.findUnique({
      where: { correo: email },
      include: {
        vi_rol: true,
        vi_persona: true,
      },
    });

    if (!usuario) {
      return null;
    }

    return usuario;
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

  async updatePersonaInfo(id: string, data: PersonaUpdateDTO): Promise<any> {
    const usuario = await this.prisma.vi_usuario.findUnique({
      where: {
        id,
      },
    });

    const persona = await this.prisma.vi_persona.update({
      where: {
        id: usuario.id_persona,
      },
      data: data,
    });

    const user = await this.prisma.vi_usuario.findUnique({
      where: {
        id,
      },
      include: {
        vi_persona: true,
        vi_rol: true,
      },
    });

    return user;
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

  async addPoints(id: string, puntos: number): Promise<boolean> {
    try {
      await this.usuarioRepository.addPoints(id, puntos);
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Error al sumar puntos');
    }
  }
}
