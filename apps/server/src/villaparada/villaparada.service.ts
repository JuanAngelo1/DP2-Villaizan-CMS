import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VillaparadaRepository } from './villaparada.repository';
import { VillaParadaDTO } from './dto/villaparada.dto';

@Injectable()
export class VillaparadaService {
  constructor(private villaparadaRepository: VillaparadaRepository) {}

  async getAllVillaparadas() {
    try {
      return this.villaparadaRepository.findAll();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createVillaparada(data: VillaParadaDTO) {
    try {
      const nuevaVillaparada = this.villaparadaRepository.create(data);
      return nuevaVillaparada;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateVillaparada(id: number, data: VillaParadaDTO) {
    try {
      return this.villaparadaRepository.update(id, data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteVillaparada(id: number) {
    try {
      return this.villaparadaRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
