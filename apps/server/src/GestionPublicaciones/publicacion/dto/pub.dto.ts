import { IsString } from 'class-validator';

export class VersionDto {
  id_publicacion: number;
  titulo: string;
  urlimagen?: string;
  descripcionSEO: string;
  fechapublicacion?: Date;
  slug:string;
  richtext: string;

  categorias: string[];  // Arrays de categorías
  etiquetas: string[];   // Arrays de etiquetas
  imagenes?: string[];
}
