import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { vi_persona } from "@prisma/client"
import { v4 as uuidv4 } from 'uuid'; 

@Injectable()
export class PersonaService {

    constructor (private prisma: PrismaService) {}
    
    async createPersona(): Promise<vi_persona> {
        return this.prisma.vi_persona.create({
          data: {
            id: `per-${uuidv4().split('-')[0]}`,  
            estado: 'Activo', 
            estaactivo: true, 
            usuariocreacion: '2A', 
          },
        });
    }




}

