import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { GrupoController } from './modules/grupos/infraestructure/controllers/grupos.controller';
import { GrupoModule } from './modules/grupos/grupo.module';
import { UsuarioGrupoModule } from './modules/grupo-user/grupo-user.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    GrupoModule,
    UsuarioGrupoModule,
  ],
  controllers: [AppController], 
  providers: [AppService],
})
export class AppModule {}