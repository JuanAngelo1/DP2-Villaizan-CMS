import { IsString } from 'class-validator';

export class CreatePublicacionDto {
  titulo: string;
  urlimagen?: string;
  descripcionSEO: string;
  fechapublicacion?: Date;
  slug:string;
  richtext: string;
  id_tipopublicacion: number;
  id_estadopublicacion: number;
  id_usuario: string;
  categorias: string[];  // Arrays de categorías
  etiquetas: string[];   // Arrays de etiquetas
}
