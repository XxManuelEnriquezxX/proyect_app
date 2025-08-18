import { Injectable } from '@nestjs/common';
import { IGrupoRepository } from '../../domain/interfaces/grupo-repository.interface';
import { Grupo } from '../../domain/entities/grupo';

@Injectable()
export class CreateGroupUseCase {
  constructor(
    private readonly suscripcionRepository: IGrupoRepository,
  ) {}

  async execute(params: {
    nombre: string;
    descripcion?: string;
    ownerId: string;
  }): Promise<Grupo> {
    const { nombre, descripcion, ownerId } = params;

    const nuevaSuscripcion = new Grupo(
      '', 
      nombre,
      ownerId,
      descripcion,
      new Date(), 
    );

    return this.suscripcionRepository.crear(nuevaSuscripcion);
  }
}
