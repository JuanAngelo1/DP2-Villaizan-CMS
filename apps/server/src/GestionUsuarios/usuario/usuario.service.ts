import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { vi_usuario } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { GoogleUserDto } from './dto/google-user.dto';
import { PersonaUpdateDTO } from './dto/persona.dto';
import { UsuarioDto } from './dto/usuario.dto';
import { UsuarioRepository } from './usuario.repository';
import { ClientUser } from 'prisma/prisma.types';

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

  async getUsuarioByID(id: string): Promise<ClientUser> {
    const usuario = await this.prisma.vi_usuario.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        correo: true,
        imagenperfil: true,
        puntosacumulados: true,
        id_rol: true,
        vi_rol: true,
        id_persona: true,
        vi_persona: true,
        creadoen: true,
      },
    });

    return usuario;
  }

  async verifyGoogleUser(data: GoogleUserDto): Promise<any> {
    const user = await this.prisma.vi_usuario.findFirst({
      where: {
        correo: data.email,
      },
    });

    console.log('Llego aqui?');

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

    if (data.apellido == '') {
      data.apellido = '-';
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

  async findByEmailWithRole(email: string): Promise<ClientUser | null> {
    const usuario = await this.prisma.vi_usuario.findUnique({
      where: { correo: email },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        correo: true,
        imagenperfil: true,
        puntosacumulados: true,
      },
    });

    if (!usuario) {
      return null;
    }

    return usuario;
  }

  async createUsuario(data: UsuarioDto): Promise<ClientUser> {
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

    const newUser = await this.prisma.vi_usuario.create({
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

    return {
      id: newUser.id,
      nombre: newUser.nombre,
      apellido: newUser.apellido,
      correo: newUser.correo,
      imagenperfil: newUser.imagenperfil,
      puntosacumulados: newUser.puntosacumulados,
    };
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
