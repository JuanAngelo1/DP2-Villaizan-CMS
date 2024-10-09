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
}