import { Module } from '@nestjs/common';
import { VillaparadaController } from './villaparada.controller';
import { VillaparadaService } from './villaparada.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VillaparadaRepository } from './villaparada.repository';
import { UsuarioModule } from 'src/GestionUsuarios/usuario/usuario.module';

@Module({
  imports: [HttpModule, PrismaModule, UsuarioModule],
  controllers: [VillaparadaController],
  providers: [VillaparadaService, VillaparadaRepository],
})
export class VillaparadaModule {}
