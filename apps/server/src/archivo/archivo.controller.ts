import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, BadRequestException,Req,Res } from '@nestjs/common';
import { ArchivoService } from './archivo.service';
import { Request, Response } from 'express';


@Controller('archivo')
export class ArchivoController {

    constructor (private readonly archicoService: ArchivoService) {}

}
