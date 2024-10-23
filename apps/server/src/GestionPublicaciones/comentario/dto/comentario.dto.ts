export class CreateComentarioDto {
    comentario: string;
    estadoaprobacion?: boolean;
    id_usuario: string;
    id_publicacion: number;
    nombreautor?: string;
    estaactivo: boolean;
}