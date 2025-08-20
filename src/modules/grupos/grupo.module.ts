import { Module } from '@nestjs/common';
import { PrismaService } from '../../core/databases/prisma.service';
import { GrupoController } from './infraestructure/controllers/grupos.controller';
import { CreateGroupUseCase } from './application/use-cases/create-group.use-case';
import { IGrupoRepository } from './domain/interfaces/grupo-repository.interface';
import { GrupoPrismaRepository } from './infraestructure/repositories/grupos-prisma.repository';
import { ActualizarGrupoUseCase } from './application/use-cases/update-group.use-case';
import { ObtenerGruposUseCase } from './application/use-cases/getAll-groups.use-case';
import { EliminarGrupoUseCase } from './application/use-cases/delete-group.use-case';
import { ObtenerGruposDuenioUseCase } from './application/use-cases/obtener-grupos-duenio.use-case';

@Module({
  controllers: [GrupoController],
  providers: [
    PrismaService,
    CreateGroupUseCase,
    ObtenerGruposUseCase,
    ActualizarGrupoUseCase,
    EliminarGrupoUseCase,
    ObtenerGruposDuenioUseCase,
    {
      provide: IGrupoRepository,
      useClass: GrupoPrismaRepository,
    },
  ],
})
export class GrupoModule {}
