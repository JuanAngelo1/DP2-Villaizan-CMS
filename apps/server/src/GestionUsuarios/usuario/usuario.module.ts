import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsuarioRepository } from './usuario.repository';

@Module({
  providers: [UsuarioService, UsuarioRepository],
  controllers: [UsuarioController],
  imports: [PrismaModule],
  exports: [UsuarioService, UsuarioRepository],
})
export class UsuarioModule {}
