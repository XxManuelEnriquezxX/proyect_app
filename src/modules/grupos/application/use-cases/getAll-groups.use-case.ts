import { Injectable } from '@nestjs/common';
import { IGrupoRepository } from '../../domain/interfaces/grupo-repository.interface';
import { Suscripcion } from '../../domain/entities/subscription';
@Injectable()
export class ObtenerGruposUseCase {
  constructor(
    private readonly suscripcionRepository: IGrupoRepository,
  ) {}

  async execute(): Promise<Suscripcion[]> {
    return this.suscripcionRepository.obtenerTodas();
  }
}
