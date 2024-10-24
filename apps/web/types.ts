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
  id: number;
  titulo: string;
  descripcion: string;
  urlImagen: string;
  //!TODO -> Añadir los campos faltantes
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
