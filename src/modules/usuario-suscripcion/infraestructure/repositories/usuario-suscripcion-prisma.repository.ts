import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/databases/prisma.service';
import { IUsuarioSuscripcionRepository } from 'src/modules/usuario-suscripcion/domain/interfaces/usuario-suscripcion-repository.interface';
import { UsuarioSuscripcion } from '../../domain/entities/usuarioSuscripcion';

@Injectable()
export class UsuarioSuscripcionPrismaRepository implements IUsuarioSuscripcionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async crear(relacion: UsuarioSuscripcion): Promise<UsuarioSuscripcion> {
    const creada = await this.prisma.usuarioSubscripcion.create({
      data: {
        usuarioId: relacion.usuarioId,
        suscripcionId: relacion.suscripcionId,
      },
    });

    return new UsuarioSuscripcion(
      creada.id,
      creada.usuarioId,
      creada.suscripcionId,
    );
  }

  async existeRelacion(usuarioId: string, suscripcionId: string): Promise<boolean> {
    const existente = await this.prisma.usuarioSubscripcion.findUnique({
      where: {
        usuarioId_suscripcionId: {
          usuarioId,
          suscripcionId,
        },
      },
    });

    return !!existente;
  }

  async eliminar(usuarioId: string, suscripcionId: string): Promise<void> {
    await this.prisma.usuarioSubscripcion.delete({
      where: {
        usuarioId_suscripcionId: {
          usuarioId,
          suscripcionId,
        },
      },
    });
  }
 
}
