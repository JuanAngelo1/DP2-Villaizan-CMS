import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FaqService } from './faq.service';
import { Response } from 'express';
import { FAQDto } from './dto/faq.dto';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  async getFAQS(): Promise<any> {
    try {
      const result = await this.faqService.getAllFAQs();
      return {
        status: 'Success',
        message: 'FAQs obtenidos exitosamente',
        result: result,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: 'Error',
          message: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async createFAQ(@Body() data: FAQDto): Promise<any> {
    try {
      const result = await this.faqService.createFAQ(data);
      return {
        status: 'Success',
        message: 'FAQ creado exitosamente',
        result: result,
      };
    } catch (err) {
      throw new HttpException(
        {
          status: 'Error',
          message: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async deleteFAQ(@Param('id', ParseIntPipe) id: number): Promise<any> {
    try {
      const result = await this.faqService.deleteFAQ(id);
      return {
        status: 'Success',
        message: 'FAQ eliminado exitosamente',
        result: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error',
          message: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async updateFAQ(@Param('id', ParseIntPipe) id: number, @Body() data: FAQDto) {
    try {
      const result = this.faqService.updateFAQ(id, data);
      return {
        status: 'Success',
        message: 'FAQ actualizado exitosamente',
        result: result,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: 'Error',
          message: 'Internal Server Error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
