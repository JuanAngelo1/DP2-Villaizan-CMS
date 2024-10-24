import { Module } from '@nestjs/common';
import { EtiquetaController } from './etiqueta.controller';
import { EtiquetaService } from './etiqueta.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EtiquetaRepository } from './etiqueta.repository';

@Module({
  controllers: [EtiquetaController],
  providers: [EtiquetaService, EtiquetaRepository],
  imports: [PrismaModule],
})
export class EtiquetaModule {}
