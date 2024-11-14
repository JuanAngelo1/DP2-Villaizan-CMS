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
import { FaqController } from './Preguntas/faq.controller';
import { FaqModule } from './Preguntas/faq.module';
import { FaqService } from './Preguntas/faq.service';
import { FrutasModule } from './Frutas/frutas.module';
import { FrutasService } from './Frutas/frutas.service';
import { FrutasController } from './Frutas/frutas.controller';
import { PuntosVentaModule } from './PuntosVenta/puntos-venta.module';
import { PuntosVentaController } from './PuntosVenta/puntos-venta.controller';
import { PuntosVentaService } from './PuntosVenta/puntos-venta.service';
import { SentimientosController } from './Sentimientos/sentimientos.controller';
import { SentimientosModule } from './sentimientos/sentimientos.module';
import { SentimientosService } from './Sentimientos/sentimientos.service';

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
    FrutasModule,
    PuntosVentaModule,
    SentimientosModule,
  ],
  controllers: [
    UsuarioController,
    ArchivoController,
    RolController,
    PermisoController,
    FaqController,
    FrutasController,
    PuntosVentaController,
    SentimientosController,
  ],
  providers: [
    UsuarioService,
    ArchivoService,
    RolService,
    PermisoService,
    FaqService,
    FrutasService,
    PuntosVentaService,
    SentimientosService,
  ],
})
export class AppModule {}
