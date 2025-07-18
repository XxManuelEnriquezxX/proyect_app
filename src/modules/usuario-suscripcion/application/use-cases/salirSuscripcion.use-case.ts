import { Injectable, NotFoundException } from '@nestjs/common';
import { IUsuarioSuscripcionRepository } from '../../domain/interfaces/usuario-suscripcion-repository.interface';

@Injectable()
export class SalirDeSuscripcionUseCase {
  constructor(
    private readonly repository: IUsuarioSuscripcionRepository,
  ) {}

 async execute(usuarioId: string, suscripcionId: string): Promise<void> {
    console.log('eliminado', usuarioId, suscripcionId)
  await this.repository.eliminar(usuarioId, suscripcionId);
}
}
