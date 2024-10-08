import { Module } from '@nestjs/common';
import { RolController } from './rol.controller';
import { RolService } from './rol.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [RolController],
  providers: [RolService],
  imports: [PrismaModule]
})
export class RolModule {}
