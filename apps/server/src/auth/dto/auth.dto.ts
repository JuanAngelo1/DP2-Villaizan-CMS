import { IsString } from "class-validator";

export class AuthPayLoad{

    @IsString()
    email: string;

    @IsString()
    password: string;
}