import { Injectable, NotFoundException } from '@nestjs/common';
import { ISuscripcionRepository } from '../../domain/interfaces/suscripcion-repository.interface';
import { Suscripcion } from '../../domain/entities/subscription';

@Injectable()
export class ActualizarSuscripcionUseCase {
  constructor(
    private readonly suscripcionRepository: ISuscripcionRepository,
  ) {}

  async execute(id: string, data: Partial<Omit<Suscripcion, 'id' | 'ownerId' | 'createdAt'>>): Promise<Suscripcion> {
    const existente = await this.suscripcionRepository.buscarPorId(id);

    if (!existente) {
      throw new NotFoundException('La suscripción no existe');
    }

    const suscripcionActualizada = new Suscripcion(
      existente.id,
      data.nombre ?? existente.nombre,
      existente.ownerId,
      data.descripcion ?? existente.descripcion,
      existente.createdAt,
    );

    return this.suscripcionRepository.actualizar(id, suscripcionActualizada);
  }
}
