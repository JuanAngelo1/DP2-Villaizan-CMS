export class UpdateVersionDto {
    titulo?: string;
    urlimagen?: string;
    descripcion?: string;
    fechapublicacion?: Date;
    slug?: string;
    richtext?: string;
    categorias?: number[];  // Array de nombres de categorías
    etiquetas?: number[];   // Array de nombres de etiquetas
    imagenes?: string[];     // Array de URLs de imágenes adicionales
  }
  