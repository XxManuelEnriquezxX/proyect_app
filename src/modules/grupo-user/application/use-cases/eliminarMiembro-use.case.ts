import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { IUsuarioGrupoRepository } from '../../domain/interfaces/usuario-grupo-repository.interface';
import { PrismaService } from 'src/core/databases/prisma.service';

@Injectable()
export class EliminarMiembroUseCase {
  constructor(
    private readonly repository: IUsuarioGrupoRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(params: { ownerId: string; suscripcionId: string; usuarioId: string }): Promise<void> {
    const { ownerId, suscripcionId, usuarioId } = params;

    const suscripcion = await this.prisma.grupo.findUnique({
      where: { id: suscripcionId },
    });

    if (!suscripcion) {
      throw new NotFoundException('La suscripción no existe');
    }

    if (suscripcion.ownerId !== ownerId) {
      throw new ForbiddenException('No tienes permiso para eliminar usuarios de esta suscripción');
    }

    const existe = await this.repository.existeRelacion(usuarioId, suscripcionId);
    if (!existe) {
      throw new NotFoundException('El usuario no está en esta suscripción');
    }

    await this.repository.eliminar(usuarioId, suscripcionId);
  }
}
