import { Controller,Post,Get,Delete,Put, Body } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { vi_persona } from "@prisma/client"

@Controller('persona')
export class PersonaController {

    constructor (private readonly personaService: PersonaService) {}

    @Post()
    async createUsuario() {
        return this.personaService.createPersona();
    }

}
