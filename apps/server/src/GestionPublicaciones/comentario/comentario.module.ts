import { Module } from '@nestjs/common';
import { ComentarioController } from './comentario.controller';
import { ComentarioService } from './comentario.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ComentarioController],
  providers: [ComentarioService],
  imports: [PrismaModule,HttpModule],
})
export class ComentarioModule {}
