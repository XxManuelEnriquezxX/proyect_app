import { Module } from '@nestjs/common';
import { PrismaService } from 'src/core/databases/prisma.service';
import { UsuarioSuscripcionPrismaRepository } from './infraestructure/repositories/usuario-grupo-prisma.repository';
import { IUsuarioGrupoRepository } from './domain/interfaces/usuario-grupo-repository.interface';
import { AsociarUsuarioUseCase } from './application/use-cases/asociar-usuario.use-case';
import { UsuarioSuscripcionController } from './infraestructure/controllers/usuario-suscripcion.controller';
import { EliminarMiembroUseCase } from './application/use-cases/eliminarMiembro-use.case';

@Module({
  controllers: [UsuarioSuscripcionController],
  providers: [
    PrismaService,
    AsociarUsuarioUseCase,
    EliminarMiembroUseCase,
    {
      provide: IUsuarioGrupoRepository,
      useClass: UsuarioSuscripcionPrismaRepository,
    },
  ],
})
export class UsuarioSuscripcionModule {}
