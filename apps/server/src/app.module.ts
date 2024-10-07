import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioController } from './GestionUsuarios/usuario/usuario.controller';
import { UsuarioModule } from './GestionUsuarios/usuario/usuario.module';
import { UsuarioService } from './GestionUsuarios/usuario/usuario.service';
import { PersonaModule } from './GestionUsuarios/persona/persona.module';
import { AuthModule } from './auth/auth.module';
import { PublicacionModule } from './publicacion/publicacion.module';
import { ArchivoModule } from './archivo/archivo.module';
import { ArchivoController } from './archivo/archivo.controller';
import { ArchivoService } from './archivo/archivo.service';
import { CategoriaModule } from './categoria/categoria.module';
import { EtiquetaModule } from './etiqueta/etiqueta.module';
import { RolModule } from './GestionUsuarios/rol/rol.module';
import { RolController } from './GestionUsuarios/rol/rol.controller';
@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    UsuarioModule,
    PersonaModule,
    AuthModule,
    PublicacionModule,
    ArchivoModule,
    CategoriaModule,
    EtiquetaModule,
    RolModule,
  ],
  controllers: [UsuarioController, ArchivoController, RolController],
  providers: [UsuarioService, ArchivoService],
})
export class AppModule {}
