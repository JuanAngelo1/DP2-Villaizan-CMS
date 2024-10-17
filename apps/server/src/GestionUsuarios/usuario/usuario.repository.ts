import { vi_usuario } from '@prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuarioRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<vi_usuario[]> {
    return this.prisma.vi_usuario.findMany();
  }

  async findById(id: string): Promise<vi_usuario | null> {
    const user = await this.prisma.vi_usuario.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  async findByEmail(email: string): Promise<vi_usuario | null> {
    const user = await this.prisma.vi_usuario.findUnique({
      where: {
        correo: email,
        estaactivo: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  async updatePassword(id: string, newPassword: string): Promise<vi_usuario> {
    const user = await this.prisma.vi_usuario.update({
      where: {
        id,
      },
      data: {
        contrasena: newPassword,
      },
    });

    return user;
  }
}
