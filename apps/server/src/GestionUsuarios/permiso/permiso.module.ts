import { Module } from '@nestjs/common';
import { PermisoController } from './permiso.controller';
import { PermisoService } from './permiso.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [PermisoController],
  providers: [PermisoService],
  imports: [PrismaModule]
})
export class PermisoModule {}
