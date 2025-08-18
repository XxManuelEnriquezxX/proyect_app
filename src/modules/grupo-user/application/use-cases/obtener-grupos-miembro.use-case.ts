import { Injectable } from '@nestjs/common';
import { IUsuarioGrupoRepository } from '../../domain/interfaces/usuario-grupo-repository.interface';
//import { Grupo } from 'src/modules/grupos/domain/entities/subscription';
import { Grupo } from 'src/modules/grupos/domain/entities/grupo';
@Injectable()
export class ObtenerGruposMiembroUseCase {
  constructor(private readonly repository: IUsuarioGrupoRepository) {}

  async execute(usuarioId: string): Promise<Grupo[]> {
    return await this.repository.obtenerGruposPorUsuario(usuarioId);
  }
}
