import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SuscripcionesController } from './modules/suscripciones/infraestructure/controllers/suscripciones/suscripciones.controller';
import { SuscripcionesModule } from './modules/suscripciones/suscripciones.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    SuscripcionesModule,
  ],
  controllers: [AppController, SuscripcionesController],
  providers: [AppService],
})
export class AppModule {}
