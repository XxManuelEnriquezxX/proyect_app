import { Injectable, NotFoundException } from '@nestjs/common';
import { IGrupoRepository } from '../../domain/interfaces/grupo-repository.interface';
import { Grupo } from '../../domain/entities/grupo';

@Injectable()
export class ActualizarGrupoUseCase {
  constructor(
    private readonly suscripcionRepository: IGrupoRepository,
  ) {}

  async execute(id: string, data: Partial<Omit<Grupo, 'id' | 'ownerId' | 'createdAt'>>): Promise<Grupo> {
    const existente = await this.suscripcionRepository.buscarPorId(id);

    if (!existente) {
      throw new NotFoundException('La suscripción no existe');
    }

    const suscripcionActualizada = new Grupo(
      existente.id,
      data.nombre ?? existente.nombre,
      existente.ownerId,
      data.descripcion ?? existente.descripcion,
      existente.createdAt,
    );

    return this.suscripcionRepository.actualizar(id, suscripcionActualizada);
  }
}
