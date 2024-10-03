import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioService } from './usuario/usuario.service';
import { PersonaModule } from './persona/persona.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule, PrismaModule, UsuarioModule, PersonaModule, AuthModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class AppModule {}
