import { Module } from '@nestjs/common';
import { EtiquetaController } from './etiqueta.controller';
import { EtiquetaService } from './etiqueta.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [EtiquetaController],
  providers: [EtiquetaService],
  imports: [PrismaModule],
})
export class EtiquetaModule {}
