import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/databases/prisma.service';
import { IUsuarioGrupoRepository } from 'src/modules/grupo-user/domain/interfaces/usuario-grupo-repository.interface';
import { UsuarioGrupo } from '../../domain/entities/usuarioGrupo';
import { Grupo } from '../../../grupos/domain/entities/grupo';
import { User } from '../../../users/domain/entities/user';
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

    async verificarExistencia(usuarioId: string, grupoId: string): Promise<boolean> {
  const existente = await this.prisma.usuarioGrupo.findUnique({
    where: {
      usuarioId_grupoId: {
        usuarioId,
        grupoId,
      },
    },
  });

  return !!existente;
 }

 async obtenerGruposPorUsuario(usuarioId: string): Promise<Grupo[]> {
  const relaciones = await this.prisma.usuarioGrupo.findMany({
    where: { usuarioId },
    include: {
      grupo: true,
    },
  });

  return relaciones.map((rel) => new Grupo(
    rel.grupo.id,
    rel.grupo.nombre,
    rel.grupo.ownerId,
    rel.grupo.descripcion ?? undefined,
    rel.grupo.createdAt ?? undefined
  ));
}
async obtenerMiembrosPorGrupo(grupoId: string): Promise<User[]> {
  const miembros = await this.prisma.usuarioGrupo.findMany({
    where: { grupoId },
    include: { usuario: true },
  });

  return miembros.map((m) => new User(
    m.usuario.id,
    m.usuario.nombreUsuario,
    m.usuario.password,
    m.usuario.email,
    m.usuario.name,
    m.usuario.apellidoPaterno,
    m.usuario.apellidoMaterno,
    m.usuario.suscripto,
  ));
}

 
}
