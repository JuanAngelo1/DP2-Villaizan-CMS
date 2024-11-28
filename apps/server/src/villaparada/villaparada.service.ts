import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VillaparadaRepository } from './villaparada.repository';
import { VillaParadaDTO } from './dto/villaparada.dto';
import { AgregarPuntosDTO } from './dto/agregarpuntos.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UsuarioService } from 'src/GestionUsuarios/usuario/usuario.service';

@Injectable()
export class VillaparadaService {
  constructor(
    private villaparadaRepository: VillaparadaRepository,
    private usuarioService: UsuarioService,
  ) {}

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

  async sumarPuntos(data: AgregarPuntosDTO) {
    try {
      const result = await this.villaparadaRepository.sumarPuntos(data);

      // Si el resultado tiene la propiedad success = false, significa que hubo un error de unicidad
      if (result.success === false) {
        return result; // Retorna el mensaje de error si es de unicidad
      }

      const usuario = await this.usuarioService.getUsuarioByID(data.id_usuario);
      if (!usuario) {
        throw new Error('No se encontró el usuario');
      }

      await this.usuarioService.addPoints(data.id_usuario, data.puntos);
      return { success: true, data: result }; // Si no hubo error, devuelve el resultado
    } catch (error) {
      console.error(error);
      throw error; // En caso de otros errores, se vuelve a lanzar
    }
  }
}
