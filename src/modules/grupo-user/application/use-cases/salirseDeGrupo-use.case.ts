import { Injectable, NotFoundException } from '@nestjs/common';
import { IUsuarioGrupoRepository } from '../../domain/interfaces/usuario-grupo-repository.interface';


@Injectable()
export class SalirDeGrupoUseCase {
  constructor(private readonly repository: IUsuarioGrupoRepository) {}

  async execute(usuarioId: string, grupoId: string): Promise<void> {
    const existe = await this.repository.verificarExistencia(usuarioId, grupoId);

    if (!existe) {
      throw new NotFoundException('No estás asociado a este grupo');
    }

    await this.repository.eliminar(usuarioId, grupoId);
  }
}