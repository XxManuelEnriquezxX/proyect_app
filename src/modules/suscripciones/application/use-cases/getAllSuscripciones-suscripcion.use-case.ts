import { Injectable } from '@nestjs/common';
import { ISuscripcionRepository } from '../../domain/interfaces/suscripcion-repository.interface';
import { Suscripcion } from '../../domain/entities/subscription';
@Injectable()
export class ObtenerSuscripcionesUseCase {
  constructor(
    private readonly suscripcionRepository: ISuscripcionRepository,
  ) {}

  async execute(): Promise<Suscripcion[]> {
    return this.suscripcionRepository.obtenerTodas();
  }
}
