import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioService } from './usuario/usuario.service';

@Module({
  imports: [ConfigModule, PrismaModule, UsuarioModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class AppModule {}
