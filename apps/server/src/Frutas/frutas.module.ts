import { Module } from '@nestjs/common';
import { FrutasController } from './frutas.controller';
import { FrutasService } from './frutas.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [FrutasController],
  providers: [FrutasService],
  imports: [PrismaModule]
})
export class FrutasModule {}
