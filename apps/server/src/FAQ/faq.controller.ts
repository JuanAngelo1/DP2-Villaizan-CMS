import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Res,
  Param,
  Req,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { FaqService } from './faq.service';
import { Response } from 'express';
import { FAQDto } from './dto/faq.dto';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Get()
  async getFAQS(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.faqService.getAllFAQs();
      return response.status(200).json({
        status: 'Success',
        message: 'FAQs encontrados',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Error',
        message: 'Error al obtener los FAQs',
        result: [],
      });
    }
  }

  @Post()
  async createFAQ(
    @Body() data: FAQDto,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.faqService.createFAQ(data);
      return response.status(200).json({
        status: 'Success',
        message: 'FAQ creado exitosamente',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        status: 'Error',
        message: 'Error al crear el FAQ',
        result: [],
      });
    }
  }

  @Put(':id')
  async deleteFAQ(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.faqService.deleteFAQ(id);
      return response.status(200).json({
        status: 'Success',
        message: 'FAQ eliminado exitosamente',
        result: result,
      });
    } catch (error) {
      return response.status(404).json({
        status: 'Error',
        message: 'FAQ no existe',
        result: [],
      });
    }
  }

  @Put(':id')
  async updateFAQ(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: FAQDto,
    @Res() response: Response,
  ) {
    try {
      const result = this.faqService.updateFAQ(id, data);
      return {
        status: 'Success',
        message: 'FAQ actualizado exitosamente',
        result: result,
      };
    } catch (error) {
      return response.status(404).json({
        status: 'Error',
        message: 'FAQ no existe',
        result: [],
      });
    }
  }
}
