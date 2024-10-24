import { Module } from '@nestjs/common';
import { RolController } from './rol.controller';
import { RolService } from './rol.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RolRepository } from './rol.repository';

@Module({
  controllers: [RolController],
  providers: [RolService, RolRepository],
  imports: [PrismaModule],
  exports: [RolService, RolRepository],
})
export class RolModule {}
