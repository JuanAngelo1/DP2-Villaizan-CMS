import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FaqController } from './faq.controller';
import { FaqRepository } from './faq.repository';

@Module({
  controllers: [FaqController],
  providers: [FaqService, FaqRepository],
  imports: [PrismaModule],
  exports: [FaqService, FaqRepository],
})
export class FaqModule {}
