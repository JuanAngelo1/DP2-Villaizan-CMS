export class ControlledError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ControlledError";
  }
}

export type Response<T> = {
  data: {
    status: "Success" | "Error";
    message: string;
    result: T;
  };
};

export type ResponseModuloRedes<T> = {
  data: T;
  status: number;
};

export type Etiqueta = {
  id: string;
  nombre: string;
  descripcion: string;
  colorfondo: string;
  colortexto: string;
};

export type Categoria = {
  id: string;
  nombre: string;
  descripcion: string;
  colorfondo: string;
  colortexto: string;
};

export type Publicacion = {
  id: number;
  titulo: string;
  descripcion: string;
  urlImagen: string;
  fechacreacion: string;
  fechapublicacion: string;
  estaactivo: boolean;
  archivado?: boolean;
  tipo_publicacion?: TipoPublicacion | null;
  id_usuario?: string | null;
  comentarios: Comentario[];
  etiquetas: string[];
  categorias: string[];
  fecha_creacion: string;
  vi_version_publicacion: VersionPublicacion[];
};

export type TipoPublicacion = {
  id: number;
  nombre: string;
  descripcion?: string | null;
  fechacreacion: string;
  estaactivo: boolean;
  publicaciones: Publicacion[];
};

export type VersionPublicacion = {
  id: number;
  id_publicacion: number;
  id_estado: number;
  titulo: string;
  urlimagen: string | null;
  descripcion: string | null;
  slug: string | null;
  fechacreacion: string;
  fechaultimamodificacion: string;
  estaactivo: boolean | null;
  richtext: string | null;
  fechapublicacion: string | null;
  categorias: Categoria[];
  etiquetas: Etiqueta[];
  comentarios?: Comentario[];

  vi_publicacion: Publicacion;
  vi_estado_version: EstadoVersion;
};

export type EstadoVersion = {
  id: number;
  nombre: string;
  descripcion?: string | null;
  color?: string | null;
  estaactivo: boolean;
  versiones: VersionPublicacion[];
};

export type Usuario = {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  imagenperfil: string;
  puntosacumulados: number;
  id_rol: string;
  vi_rol?: Rol;
  id_persona: string;
  vi_persona?: Persona;
  creadoen: Date;
};

export type Persona = {
  id: string;
  tipodocumento: string | null;
  numerodocumento: string | null;
  razoneliminacion: string | null;
  sexo: string | null;
  edad: number | null;
  estado: string;
  estaactivo: boolean;
  desactivadoen: Date | null;
  creadoen: Date;
  actualizadoen: Date;
  usuariocreacion: string;
  usuarioactualizacion: string | null;
};

export type Comentario = {
  id: number;
  comentario: string;
  estadoaprobacion: boolean | null;
  fechacreacion: string;
  id_publicacion: number;
  publicacion?: Publicacion;
  id_usuario: string;
  usuario: Usuario;
  id_sentimiento: number;
};

export type Rol = {
  id: string;
  nombre: string;
  actualizadoen: Date;
  eliminadoen: Date | null;
  estaactivo: true;
};

export type FAQ = {
  id: string;
  pregunta: string;
  respuesta: string;
  fechacreacion: Date;
  fechaultimamodificacion: Date;
  estaactivo: boolean;
};

export type PuntoVenta = {
  id?: number;
  nombre: string;
  direccion: string;
  lat: number;
  lng: number;
  nota?: string;
  id_fruta?: string;
};

export type Sentimiento = {
  id: number;
  nombre: string;
  estaactivo: boolean;
  colorfondo: string;
  colortexto: string;
};

export type Encuesta = {
  id: number | string;
  title: string;
  description: string;
  status: string;
  start_date: Date;
  end_date: Date;
};

export type DateRange = {
  start: Date | null;
  end: Date | null;
};

export type ContenidoEducativo = {
  id_fruta: string;
  titulo: string;
  contenidoinformacion: string;
  tipocontenido: "Información" | "Video" | "Imagen";
  urlcontenido: string;
  fechapublicacion: string;
  estaactivo: boolean;
};

export type Promocion = {
  id: string;
  titulo: string;
  porcentajedescuento: string;
};

export type Producto = {
  id: string;
  nombre: string;
  urlimagen: string;
  precioecommerce: string;
  descripcion: string;
  vi_promocion: Promocion | null;
  vi_combo_x_producto: any[];
};

export type ProductoFruta = {
  vi_producto: Producto;
};

export type Villaparada = {
  id: number;
  nombre: string;
  latitud: number;
  longitud: number;
  direccion: string;
  isUnlocked: boolean | undefined;
}

export type Fruta = {
  id: string;
  nombre: string;
  descripcion: string;
  vi_contenidoeducativo: ContenidoEducativo[];
  vi_producto_fruta: ProductoFruta[];
  vi_villaparada: Villaparada[];
};
