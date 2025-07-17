import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/databases/prisma.service';
import { SuscripcionesController } from './infraestructure/controllers/suscripciones.controller';
import { CreateSuscripcionUseCase } from './application/use-cases/create-suscripcion.use-case';
import { ISuscripcionRepository } from './domain/interfaces/suscripcion-repository.interface';
import { SuscripcionPrismaRepository } from './infraestructure/repositories/suscripcion-prisma.repository';

@Module({
  controllers: [SuscripcionesController],
  providers: [
    PrismaService,
    CreateSuscripcionUseCase,
    {
      provide: ISuscripcionRepository,
      useClass: SuscripcionPrismaRepository,
    },
  ],
})
export class SuscripcionesModule {}
