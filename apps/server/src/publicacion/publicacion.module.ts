import { Module } from '@nestjs/common';
import { PublicacionController } from './publicacion.controller';
import { PublicacionService } from './publicacion.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PublicacionController],
  providers: [PublicacionService],
  imports: [PrismaModule],
})
export class PublicacionModule {}
