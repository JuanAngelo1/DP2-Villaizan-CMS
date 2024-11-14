import { Module } from '@nestjs/common';
import { SentimientosController } from './sentimientos.controller';
import { SentimientosService } from './sentimientos.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SentimientosController],
  providers: [SentimientosService],
  imports: [PrismaModule],
})
export class SentimientosModule {}
