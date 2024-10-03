import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioService } from './usuario/usuario.service';
import { PersonaModule } from './persona/persona.module';

@Module({
  imports: [ConfigModule, PrismaModule, UsuarioModule, PersonaModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class AppModule {}
