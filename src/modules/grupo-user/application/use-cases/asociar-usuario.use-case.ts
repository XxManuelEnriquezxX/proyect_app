import { Injectable, ConflictException } from '@nestjs/common';
import { IUsuarioGrupoRepository } from '../../domain/interfaces/usuario-grupo-repository.interface';
import { UsuarioGrupo } from '../../domain/entities/usuarioGrupo';
import { randomUUID } from 'crypto';

@Injectable()
export class AsociarUsuarioUseCase {
  constructor(
    private readonly repository: IUsuarioGrupoRepository,
  ) {}

  async execute(params: { usuarioId: string; suscripcionId: string }): Promise<UsuarioGrupo> {
    const yaExiste = await this.repository.existeRelacion(params.usuarioId, params.suscripcionId);

    if (yaExiste) {
      throw new ConflictException('El usuario ya pertenece a esta suscripción');
    }

    const nuevaRelacion = new UsuarioGrupo(
        '',
        params.usuarioId,
      params.suscripcionId,
    );

    return this.repository.crear(nuevaRelacion);
  }
}
