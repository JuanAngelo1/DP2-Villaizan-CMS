import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});

  app.enableCors({
    origin: 'https://landing.heladosvillaizan.tech', // Asegúrate de permitir el dominio externo
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si necesitas enviar cookies o headers de autenticación
  });

  app.setGlobalPrefix('apis');
  await app.listen(5000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
