import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/databases/prisma.service';
import { IUsuarioGrupoRepository } from 'src/modules/grupo-user/domain/interfaces/usuario-grupo-repository.interface';
import { UsuarioGrupo } from '../../domain/entities/usuarioGrupo';

@Injectable()
export class UsuarioSuscripcionPrismaRepository implements IUsuarioGrupoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async crear(relacion: UsuarioGrupo): Promise<UsuarioGrupo> {
    const creada = await this.prisma.usuarioGrupo.create({
      data: {
        usuarioId: relacion.usuarioId,
        grupoId: relacion.grupoId,
      },
    });

    return new UsuarioGrupo(
      creada.id,
      creada.usuarioId,
      creada.grupoId,
    );
  }

  async existeRelacion(usuarioId: string, grupoId: string): Promise<boolean> {
    const existente = await this.prisma.usuarioGrupo
.findUnique({
      where: {
        usuarioId_grupoId: {
          usuarioId,
          grupoId,
        },
      },
    });

    return !!existente;
  }

   async eliminar(usuarioId: string, grupoId: string): Promise<void> {
    await this.prisma.usuarioGrupo.delete({
      where: {
        usuarioId_grupoId: {
          usuarioId,
          grupoId,
        },
      },
    });
  }

 
}
