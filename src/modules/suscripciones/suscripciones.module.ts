import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/databases/prisma.service';
import { SuscripcionesController } from './infraestructure/controllers/suscripciones.controller';
import { CreateSuscripcionUseCase } from './application/use-cases/create-suscripcion.use-case';
import { ISuscripcionRepository } from './domain/interfaces/suscripcion-repository.interface';
import { SuscripcionPrismaRepository } from './infraestructure/repositories/suscripcion-prisma.repository';
import { ActualizarSuscripcionUseCase } from './application/use-cases/update-suscripcion.use-case';
import { ObtenerSuscripcionesUseCase } from './application/use-cases/getAllSuscripciones-suscripcion.use-case';
import { EliminarSuscripcionUseCase } from './application/use-cases/delete-suscripcion.use-case';

@Module({
  controllers: [SuscripcionesController],
  providers: [
    PrismaService,
    CreateSuscripcionUseCase,
    ObtenerSuscripcionesUseCase,
    ActualizarSuscripcionUseCase,
    EliminarSuscripcionUseCase,
    {
      provide: ISuscripcionRepository,
      useClass: SuscripcionPrismaRepository,
    },
  ],
})
export class SuscripcionesModule {}
