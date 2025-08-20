import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../core/databases/prisma.service';
import { IGrupoRepository } from 'src/modules/grupos/domain/interfaces/grupo-repository.interface';
import { Grupo } from '../../domain/entities/grupo';

@Injectable()
export class GrupoPrismaRepository implements IGrupoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async crear(suscripcion: Grupo): Promise<Grupo> {
    const created = await this.prisma.grupo.create({
      data: {
        nombre: suscripcion.nombre,
        descripcion: suscripcion.descripcion,
        ownerId: suscripcion.ownerId,
      },
    });

    return new Grupo(
      created.id,
      created.nombre,
      created.ownerId,
      created.descripcion ?? "",
      created.createdAt,
    );
  }

  
 async buscarPorId(id: string): Promise<Grupo | null> {
    const found = await this.prisma.grupo.findUnique({
      where: { id },
    });

    if (!found) return null;

    return new Grupo(
      found.id,
      found.nombre,
      found.ownerId,
      found.descripcion ?? "",
      found.createdAt,
    );
  }

  async obtenerTodas(): Promise<Grupo[]> {
    const all = await this.prisma.grupo.findMany();

    return all.map(
      (s) =>
        new Grupo(
          s.id,
          s.nombre,
          s.ownerId,
          s.descripcion ?? "",
          s.createdAt,
        ),
    );
  }

  async actualizar(id: string, suscripcion: Grupo): Promise<Grupo> {
    const updated = await this.prisma.grupo.update({
      where: { id },
      data: {
        nombre: suscripcion.nombre,
        descripcion: suscripcion.descripcion,
      },
    });

    return new Grupo(
      updated.id,
      updated.nombre,
      updated.ownerId,
      updated.descripcion ?? "",
      updated.createdAt,
    );
  }

  async eliminar(id: string): Promise<void> {
    await this.prisma.grupo.delete({
      where: { id },
    });
  }
 
  async obtenerPorOwner(ownerId: string): Promise<Grupo[]> {
  const grupos = await this.prisma.grupo.findMany({
    where: { ownerId },
  });

  return grupos.map((g) => new Grupo(
    g.id,
    g.nombre,
    g.ownerId,
    g.descripcion ?? undefined,
    g.createdAt ?? undefined
  ));
 }

}
