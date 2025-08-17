import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/databases/prisma.service';
import { IGrupoRepository } from 'src/modules/grupos/domain/interfaces/grupo-repository.interface';
import { Suscripcion } from '../../domain/entities/subscription';

@Injectable()
export class SuscripcionPrismaRepository implements IGrupoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async crear(suscripcion: Suscripcion): Promise<Suscripcion> {
    const created = await this.prisma.grupo.create({
      data: {
        nombre: suscripcion.nombre,
        descripcion: suscripcion.descripcion,
        ownerId: suscripcion.ownerId,
      },
    });

    return new Suscripcion(
      created.id,
      created.nombre,
      created.ownerId,
      created.descripcion ?? "",
      created.createdAt,
    );
  }

  
 async buscarPorId(id: string): Promise<Suscripcion | null> {
    const found = await this.prisma.grupo.findUnique({
      where: { id },
    });

    if (!found) return null;

    return new Suscripcion(
      found.id,
      found.nombre,
      found.ownerId,
      found.descripcion ?? "",
      found.createdAt,
    );
  }

  async obtenerTodas(): Promise<Suscripcion[]> {
    const all = await this.prisma.grupo.findMany();

    return all.map(
      (s) =>
        new Suscripcion(
          s.id,
          s.nombre,
          s.ownerId,
          s.descripcion ?? "",
          s.createdAt,
        ),
    );
  }

  async actualizar(id: string, suscripcion: Suscripcion): Promise<Suscripcion> {
    const updated = await this.prisma.grupo.update({
      where: { id },
      data: {
        nombre: suscripcion.nombre,
        descripcion: suscripcion.descripcion,
      },
    });

    return new Suscripcion(
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
 
}
