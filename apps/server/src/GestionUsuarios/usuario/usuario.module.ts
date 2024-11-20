import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsuarioRepository } from './usuario.repository';
import { HttpModule } from '@nestjs/axios'; // Importar HttpModule

@Module({
  imports: [HttpModule, PrismaModule],
  providers: [UsuarioService, UsuarioRepository],
  controllers: [UsuarioController],
  exports: [UsuarioService, UsuarioRepository],
})
export class UsuarioModule {}
