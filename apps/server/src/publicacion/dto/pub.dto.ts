import { IsString } from 'class-validator';

export class CreatePublicacionDto {
  titulo: string;
  urlimagen?: string;
  descripcion: string;
  fechapublicacion?: Date;
  id_categoriapublicacion: number;
  id_tipopublicacion: number;
  id_estadopublicacion: number;
  id_usuario: string;
}
