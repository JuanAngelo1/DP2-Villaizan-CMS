export type Response<T> = {
  data: {
    status: "Success" | "Error";
    message: string;
    result: T;
  };
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
  id: string;
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
  titulo: string;
  urlimagen?: string | null;
  descripcionseo?: string | null;
  slug?: string | null;
  richtext: string;
  fechacreacion: string;
  fechaultimamodificacion: string;
  estaactivo?: boolean | null;
  estado_version: EstadoVersion;
  categorias: string[];
  etiquetas: string[];
  publicacion: Publicacion;
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
  id_rol: string;
  creadoen: Date;
  //!TODO -> Añadir los campos faltantes
};

export type Comentario = {
  comentario: string;
  estadoaprobacion: boolean | null;
  fecha: string;
  id: number;
  publicacion: Publicacion;
  usuario: Usuario;
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
  estaactivo: boolean;
  creadoen: Date;
};
