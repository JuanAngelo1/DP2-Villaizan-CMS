import { Module } from '@nestjs/common';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CategoriaController],
  providers: [CategoriaService],
  imports: [PrismaModule],
})
export class CategoriaModule {}
