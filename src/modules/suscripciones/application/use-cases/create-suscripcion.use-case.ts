import { Injectable } from '@nestjs/common';
import { ISuscripcionRepository } from '../../domain/interfaces/suscripcion-repository.interface';
import { Suscripcion } from '../../domain/entities/subscription';

@Injectable()
export class CreateSuscripcionUseCase {
  constructor(
    private readonly suscripcionRepository: ISuscripcionRepository,
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
