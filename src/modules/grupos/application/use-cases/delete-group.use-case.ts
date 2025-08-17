import { Injectable, NotFoundException } from '@nestjs/common';
import { IGrupoRepository } from '../../domain/interfaces/grupo-repository.interface';

@Injectable()
export class EliminarGrupoUseCase {
  constructor(
    private readonly suscripcionRepository: IGrupoRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const suscripcion = await this.suscripcionRepository.buscarPorId(id);

    if (!suscripcion) {
      throw new NotFoundException('La suscripción no existe');
    }

    await this.suscripcionRepository.eliminar(id);
  }
}
