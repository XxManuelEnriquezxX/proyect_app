import { Injectable } from '@nestjs/common';
import { IGrupoRepository } from '../../domain/interfaces/grupo-repository.interface';
import { Grupo } from '../../domain/entities/grupo';
@Injectable()
export class ObtenerGruposUseCase {
  constructor(
    private readonly suscripcionRepository: IGrupoRepository,
  ) {}

  async execute(): Promise<Grupo[]> {
    return this.suscripcionRepository.obtenerTodas();
  }
}
