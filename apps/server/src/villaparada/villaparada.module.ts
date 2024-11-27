import { Module } from '@nestjs/common';
import { VillaparadaController } from './villaparada.controller';
import { VillaparadaService } from './villaparada.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VillaparadaRepository } from './villaparada.repository';

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [VillaparadaController],
  providers: [VillaparadaService, VillaparadaRepository],
})
export class VillaparadaModule {}
