import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [PersonaService],
  controllers: [PersonaController],
  imports: [PrismaModule],
})
export class PersonaModule {}
