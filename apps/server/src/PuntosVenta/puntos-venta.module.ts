import { Module } from '@nestjs/common';
import { PuntosVentaController } from './puntos-venta.controller';
import { PuntosVentaService } from './puntos-venta.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PuntosVentaController],
  providers: [PuntosVentaService],
  imports: [PrismaModule]
})
export class PuntosVentaModule {}
