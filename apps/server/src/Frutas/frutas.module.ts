import { Module } from '@nestjs/common';
import { FrutasController } from './frutas.controller';
import { FrutasService } from './frutas.service';

@Module({
  controllers: [FrutasController],
  providers: [FrutasService]
})
export class FrutasModule {}
