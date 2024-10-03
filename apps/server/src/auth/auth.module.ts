import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule,
    JwtModule.register({
      secret: 'lñmk90123ngjnasd09',
      signOptions: { expiresIn: '1h' }

    })
  ],

  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
