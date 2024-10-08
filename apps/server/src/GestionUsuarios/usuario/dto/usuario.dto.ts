export class CreateUsuarioDto {
    nombre: string;
    apellido: string;
    concuenta: boolean;
    numerotelefono?: string;
    correo: string;
    contrasena: string;
    nombreRol?: string;
  }