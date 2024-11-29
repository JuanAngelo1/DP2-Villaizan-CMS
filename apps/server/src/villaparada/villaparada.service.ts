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
      const villaparada = await this.villaparadaRepository.findById(
        data.id_villaparada,
      );
      if (!villaparada) {
        throw new Error('Villa parada no encontrada');
      }

      const distance = this.calculateDistance(
        data.latitud,
        data.longitud,
        villaparada.latitud,
        villaparada.longitud,
      );

      // Verifica si la distancia es menor a 20 metros
      if (distance > 20) {
        //console.log('Distancia:', distance);
        return {
          success: false,
          message: 'La ubicación está fuera del rango permitido (20 metros)',
        };
      }

      const result = await this.villaparadaRepository.sumarPuntos(data);

      // Si el resultado tiene la propiedad success = false, significa que hubo un error de unicidad
      if (result.success === false) {
        return {
          success: false,
          message: 'Ya se sumaron puntos a esta villaparada',
        };
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

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371e3; // Radio de la Tierra en metros
    const toRadians = (angle: number) => (angle * Math.PI) / 180;

    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Retorna la distancia en metros
  }
}
