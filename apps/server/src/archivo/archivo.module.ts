import { Module } from '@nestjs/common';
import { ArchivoController } from './archivo.controller';
import { ArchivoService } from './archivo.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ArchivoController],
  providers: [ArchivoService],
  imports: [PrismaModule],
})
export class ArchivoModule {}
