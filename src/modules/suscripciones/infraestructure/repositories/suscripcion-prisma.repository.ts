import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/databases/prisma.service';
import { ISuscripcionRepository } from 'src/modules/suscripciones/domain/interfaces/suscripcion-repository.interface';
import { Suscripcion } from '../../domain/entities/subscription';

@Injectable()
export class SuscripcionPrismaRepository implements ISuscripcionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async crear(suscripcion: Suscripcion): Promise<Suscripcion> {
    const created = await this.prisma.suscripcion.create({
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

 
}
