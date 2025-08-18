import { Injectable } from '@nestjs/common';
import { IUsuarioGrupoRepository } from 'src/modules/grupo-user/domain/interfaces/usuario-grupo-repository.interface';
import { Grupo } from '../../domain/entities/grupo';
import { IGrupoRepository } from '../../domain/interfaces/grupo-repository.interface';

@Injectable()
export class ObtenerGruposDuenioUseCase {
  constructor(private readonly repository: IGrupoRepository) {}

  async execute(ownerId: string): Promise<Grupo[]> {
    return await this.repository.obtenerPorOwner(ownerId);
  }
}
