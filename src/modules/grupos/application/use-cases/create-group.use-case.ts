import { Injectable } from '@nestjs/common';
import { IGrupoRepository } from '../../domain/interfaces/grupo-repository.interface';
import { Suscripcion } from '../../domain/entities/subscription';

@Injectable()
export class CreateGroupUseCase {
  constructor(
    private readonly suscripcionRepository: IGrupoRepository,
  ) {}

  async execute(params: {
    nombre: string;
    descripcion?: string;
    ownerId: string;
  }): Promise<Suscripcion> {
    const { nombre, descripcion, ownerId } = params;

    const nuevaSuscripcion = new Suscripcion(
      '', 
      nombre,
      ownerId,
      descripcion,
      new Date(), 
    );

    return this.suscripcionRepository.crear(nuevaSuscripcion);
  }
}
