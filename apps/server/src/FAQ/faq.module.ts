import { Module } from '@nestjs/common';
import { FaqService } from './faq.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FaqController } from './faq.controller';

@Module({
  controllers: [FaqController],
  providers: [FaqService],
  imports: [PrismaModule],
})
export class FaqModule {}
