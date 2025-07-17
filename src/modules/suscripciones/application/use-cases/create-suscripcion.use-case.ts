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
      '', // 👈 Dejar en blanco para que lo genere la BD
      nombre,
      ownerId,
      descripcion,
      new Date(), // opcionalmente puedes omitir si lo maneja la BD también
    );

    return this.suscripcionRepository.crear(nuevaSuscripcion);
  }
}
