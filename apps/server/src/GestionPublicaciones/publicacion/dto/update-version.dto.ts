export class UpdateVersionDto {
    titulo?: string;
    urlimagen?: string;
    descripcionSEO?: string;
    fechapublicacion?: Date;
    slug?: string;
    richtext?: string;
    categorias?: string[];  // Array de nombres de categorías
    etiquetas?: string[];   // Array de nombres de etiquetas
    imagenes?: string[];     // Array de URLs de imágenes adicionales
  }
  