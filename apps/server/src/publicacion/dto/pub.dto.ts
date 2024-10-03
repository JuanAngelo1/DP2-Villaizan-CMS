import { IsString } from "class-validator";

export class CreatePublicacionDto {

    titulo: string;
    urlimagen?: string;
    descripcion: string;
    fechapublicacion?: Date;
    idcategoria: number;
    idtipopublicacion: number;
    idestadopublicacion: number;
}
