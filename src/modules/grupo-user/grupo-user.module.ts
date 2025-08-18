import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/databases/prisma.service';
import { UsuarioSuscripcionPrismaRepository } from './infraestructure/repositories/usuario-grupo-prisma.repository';
import { IUsuarioGrupoRepository } from './domain/interfaces/usuario-grupo-repository.interface';
import { AsociarUsuarioUseCase } from './application/use-cases/asociar-usuario.use-case';
import { UsuarioGrupoController } from './infraestructure/controllers/usuario-grupo.controller';
import { EliminarMiembroUseCase } from './application/use-cases/eliminarMiembro-use.case';
import { SalirDeGrupoUseCase } from './application/use-cases/salirseDeGrupo-use.case';
import { ObtenerGruposMiembroUseCase } from './application/use-cases/obtener-grupos-miembro.use-case';


@Module({
  controllers: [UsuarioGrupoController],
  providers: [
    PrismaService,
    AsociarUsuarioUseCase,
    EliminarMiembroUseCase,
    SalirDeGrupoUseCase,
    ObtenerGruposMiembroUseCase,
    {
      provide: IUsuarioGrupoRepository,
      useClass: UsuarioSuscripcionPrismaRepository,
    },
  ],
})
export class UsuarioGrupoModule {}
