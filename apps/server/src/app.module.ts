import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioController } from './GestionUsuarios/usuario/usuario.controller';
import { UsuarioModule } from './GestionUsuarios/usuario/usuario.module';
import { UsuarioService } from './GestionUsuarios/usuario/usuario.service';
import { PersonaModule } from './GestionUsuarios/persona/persona.module';
import { AuthModule } from './auth/auth.module';
import { PublicacionModule } from './GestionPublicaciones/publicacion/publicacion.module';
import { ArchivoModule } from './archivo/archivo.module';
import { ArchivoController } from './archivo/archivo.controller';
import { ArchivoService } from './archivo/archivo.service';
import { CategoriaModule } from './GestionPublicaciones/categoria/categoria.module';
import { EtiquetaModule } from './GestionPublicaciones/etiqueta/etiqueta.module';
import { RolModule } from './GestionUsuarios/rol/rol.module';
import { RolController } from './GestionUsuarios/rol/rol.controller';
import { RolService } from './GestionUsuarios/rol/rol.service';
import { PermisoModule } from './GestionUsuarios/permiso/permiso.module';
import { PermisoController } from './GestionUsuarios/permiso/permiso.controller';
import { PermisoService } from './GestionUsuarios/permiso/permiso.service';
import { ComentarioModule } from './GestionPublicaciones/comentario/comentario.module';
import { FaqController } from './faq/faq.controller';
import { FaqModule } from './faq/faq.module';
import { FaqService } from './faq/faq.service';

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
    PermisoModule,
    ComentarioModule,
    FaqModule,
  ],
  controllers: [UsuarioController, ArchivoController, RolController,PermisoController, FaqController],
  providers: [UsuarioService, ArchivoService,RolService,PermisoService,FaqService],
})
export class AppModule {}
