import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioService } from './usuario/usuario.service';
import { PersonaModule } from './persona/persona.module';
import { AuthModule } from './auth/auth.module';
import { PublicacionModule } from './publicacion/publicacion.module';
import { ArchivoModule } from './archivo/archivo.module';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [ConfigModule, PrismaModule, UsuarioModule, PersonaModule, AuthModule, PublicacionModule, ArchivoModule, CategoriaModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class AppModule {}
