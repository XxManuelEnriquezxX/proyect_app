import { Injectable, ConflictException } from '@nestjs/common';
import { IUsuarioSuscripcionRepository } from '../../domain/interfaces/usuario-suscripcion-repository.interface';
import { UsuarioSuscripcion } from '../../domain/entities/usuarioSuscripcion';
import { randomUUID } from 'crypto';

@Injectable()
export class AsociarUsuarioUseCase {
  constructor(
    private readonly repository: IUsuarioSuscripcionRepository,
  ) {}

  async execute(params: { usuarioId: string; suscripcionId: string }): Promise<UsuarioSuscripcion> {
    const yaExiste = await this.repository.existeRelacion(params.usuarioId, params.suscripcionId);

    if (yaExiste) {
      throw new ConflictException('El usuario ya pertenece a esta suscripción');
    }

    const nuevaRelacion = new UsuarioSuscripcion(
        '',
        params.usuarioId,
      params.suscripcionId,
    );

    return this.repository.crear(nuevaRelacion);
  }
}
