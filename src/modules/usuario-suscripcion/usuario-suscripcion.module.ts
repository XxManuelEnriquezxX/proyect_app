import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/databases/prisma.service';
import { UsuarioSuscripcionPrismaRepository } from './infraestructure/repositories/usuario-suscripcion-prisma.repository';
import { IUsuarioSuscripcionRepository } from './domain/interfaces/usuario-suscripcion-repository.interface';
import { AsociarUsuarioUseCase } from './application/use-cases/asociar-usuario.use-case';
import { UsuarioSuscripcionController } from './infraestructure/controllers/usuario-suscripcion.controller';
import { SalirDeSuscripcionUseCase } from './application/use-cases/salirSuscripcion.use-case';

@Module({
  controllers: [UsuarioSuscripcionController],
  providers: [
    PrismaService,
    AsociarUsuarioUseCase,
    SalirDeSuscripcionUseCase,
    {
      provide: IUsuarioSuscripcionRepository,
      useClass: UsuarioSuscripcionPrismaRepository,
    },
  ],
})
export class UsuarioSuscripcionModule {}
