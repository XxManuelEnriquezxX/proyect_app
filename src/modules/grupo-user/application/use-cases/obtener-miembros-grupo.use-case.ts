import { Injectable, NotFoundException } from '@nestjs/common';
import { IUsuarioGrupoRepository } from '../../domain/interfaces/usuario-grupo-repository.interface';
import { User } from 'src/modules/users/domain/entities/user';

@Injectable()
export class ObtenerMiembrosGrupoUseCase {
  constructor(private readonly repository: IUsuarioGrupoRepository) {}

  async execute(usuarioId: string, grupoId: string): Promise<User[]> {
    const pertenece = await this.repository.verificarExistencia(usuarioId, grupoId);

    if (!pertenece) {
      throw new NotFoundException('No perteneces a este grupo');
    }

    return await this.repository.obtenerMiembrosPorGrupo(grupoId);
  }
}
