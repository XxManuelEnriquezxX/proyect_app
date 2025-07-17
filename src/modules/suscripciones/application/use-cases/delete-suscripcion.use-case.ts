import { Injectable, NotFoundException } from '@nestjs/common';
import { ISuscripcionRepository } from '../../domain/interfaces/suscripcion-repository.interface';

@Injectable()
export class EliminarSuscripcionUseCase {
  constructor(
    private readonly suscripcionRepository: ISuscripcionRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const suscripcion = await this.suscripcionRepository.buscarPorId(id);

    if (!suscripcion) {
      throw new NotFoundException('La suscripción no existe');
    }

    await this.suscripcionRepository.eliminar(id);
  }
}
