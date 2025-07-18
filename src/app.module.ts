import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SuscripcionesController } from './modules/suscripciones/infraestructure/controllers/suscripciones.controller';
import { SuscripcionesModule } from './modules/suscripciones/suscripciones.module';
import { UsuarioSuscripcionModule } from './modules/usuario-suscripcion/usuario-suscripcion.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    SuscripcionesModule,
    UsuarioSuscripcionModule,
  ],
  controllers: [AppController], 
  providers: [AppService],
})
export class AppModule {}