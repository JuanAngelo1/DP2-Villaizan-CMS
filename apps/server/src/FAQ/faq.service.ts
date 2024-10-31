import { Injectable } from '@nestjs/common';
import { vi_preguntas_frecuentes } from '@prisma/client';
import { FAQDto } from './dto/faq.dto';
import { FaqRepository } from './faq.repository';

@Injectable()
export class FaqService {
  constructor(private faqRepository: FaqRepository) {}

  async getAllFAQs() {
    try {
      return await this.faqRepository.findAll();
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
      throw error;
    }
  }

  async createFAQ(data: FAQDto): Promise<vi_preguntas_frecuentes> {
    try {
      return await this.faqRepository.create(data);
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      throw error;
    }
  }

  async deleteFAQ(id: number): Promise<vi_preguntas_frecuentes> {
    try {
      return await this.faqRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateFAQ(id: number, data: FAQDto) {
    try {
      return await this.faqRepository.update(id, data);
    } catch (error) {
      console.error('Error al actualizar la publicación:', error);
      throw error;
    }
  }
}
